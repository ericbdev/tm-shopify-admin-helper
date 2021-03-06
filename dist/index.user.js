// ==UserScript==
// @name            Shopify Admin Helper
// @version         1.0.5
// @author          ericbdev
// @namespace       sah
// @description     Enhances Shopify's admin panel for developers
// @downloadURL     https://github.com/ericbdev/tm-shopify-admin-helper/raw/master/dist/index.user.js
// @match           https://*.myshopify.com/admin*
// ==/UserScript==

(function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Locations = function () {
  function Locations() {
    classCallCheck(this, Locations);

    this.location = window.location;
    this.pathname = this.location.pathname;
    this.page = this.pathname.replace('/admin/', '');
  }

  createClass(Locations, [{
    key: 'getPage',
    value: function getPage() {
      return this.page;
    }
  }, {
    key: 'isPage',
    value: function isPage(page) {
      return page === this.page;
    }
  }]);
  return Locations;
}();

/**
 * Update SalesChannelNav
 */
var SalesChannelNav = function () {
  function SalesChannelNav() {
    classCallCheck(this, SalesChannelNav);

    this.onlineStoreLink = document.querySelector('a[href="/admin/themes"].ui-nav__link');

    if (!this.onlineStoreLink) {
      return console.warn('Unable to find \'Online store\' link');
    }

    this.onlineStore = this.onlineStoreLink.parentNode;
    if (!this.onlineStore) {
      return console.warn('No \'Online Store\' menu found');
    }

    this._expandOnlineStore();
  }

  createClass(SalesChannelNav, [{
    key: '_expandOnlineStore',
    value: function _expandOnlineStore() {
      this.onlineStore.classList.add('ui-nav__item--child-selected', 'ui-rollup__item--force-show');
      this.onlineStore.querySelector('ul').classList.add('ui-rollup--show');
    }
  }]);
  return SalesChannelNav;
}();

var Themes = function () {
  function Themes() {
    classCallCheck(this, Themes);

    this.themesList = document.querySelector('.themes-list');
    this.themesListHeader = null;
    this.themes = [];

    if (!this.themesList) {
      return;
    }

    this._init();
  }

  createClass(Themes, [{
    key: '_getThemeID',
    value: function _getThemeID(themeEl) {
      return themeEl.id.replace('theme_', '');
    }

    /**
     * Get the theme name form title element, or get stored element
     * @param titleEl
     * @returns {string}
     * @private
     */

  }, {
    key: '_getThemeName',
    value: function _getThemeName(titleEl) {
      var dataTag = 'data-theme-title';
      var currentTitle = titleEl.innerText;
      var storedTitle = titleEl.getAttribute(dataTag);

      if (!storedTitle) {
        titleEl.setAttribute(dataTag, currentTitle);
        return currentTitle;
      } else {
        return storedTitle;
      }
    }
  }, {
    key: '_orderThemes',
    value: function _orderThemes() {
      this.themes.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        // Theme names match, order by ID
        // TODO: Prefer sort by last updated.
        if (nameA === nameB) {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
        }

        // names must be equal
        return 0;
      });
    }
  }, {
    key: '_organiseTheme',
    value: function _organiseTheme(themeEl) {
      var titleEl = themeEl.querySelector('.themes-list__theme-title');

      var id = this._getThemeID(themeEl);
      var name = this._getThemeName(titleEl);
      var idText = '<span style="font-size: 0.9em">Theme ID: <span style="font-weight: normal;">' + id + '</span></span>';

      titleEl.innerHTML = name + '<br/>' + idText;

      return {
        el: themeEl,
        id: this._getThemeID(themeEl),
        name: this._getThemeName(themeEl)
      };
    }
  }, {
    key: '_init',
    value: function _init() {
      var _this = this;

      this.themesListInner = this.themesList.querySelectorAll('.themes-list__row');

      this.themesListInner.forEach(function (el, index) {
        if (el instanceof HTMLElement) {
          // Is list header
          if (index === 0) {
            _this.themesListHeader = el;
            // Is theme entry
          } else {
            _this.themes.push(_this._organiseTheme(el));
          }
        }
      });

      this._orderThemes();
      this._renderList();
    }
  }, {
    key: '_renderList',
    value: function _renderList() {
      var _this2 = this;

      this.themesList.innerHTML = '';
      this.themesList.appendChild(this.themesListHeader);

      this.themes.forEach(function (item) {
        _this2.themesList.appendChild(item.el);
      });
    }
  }]);
  return Themes;
}();

var ShopifyAdminHelper = function () {
  function ShopifyAdminHelper() {
    classCallCheck(this, ShopifyAdminHelper);

    this.init = this._init.bind(this);

    document.addEventListener('page:update', this.init);
  }

  createClass(ShopifyAdminHelper, [{
    key: '_init',
    value: function _init() {
      this.locations = new Locations();
      new SalesChannelNav();

      //Pages
      if (this.locations.isPage('themes')) {
        new Themes();
      }
    }
  }]);
  return ShopifyAdminHelper;
}();

new ShopifyAdminHelper();

}());
