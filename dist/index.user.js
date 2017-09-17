// ==UserScript==
// @name            Shopify Admin Helper
// @version         0.0.1
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

    this.onlineStore = document.querySelector('[data-app-nav-container-for="online_store"]');

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

    this.themesIndex = document.querySelector('#themes-index');
    this.themesListHeader = null;
    this.themes = [];

    if (!this.themesIndex) {
      return;
    }

    this._init();
  }

  createClass(Themes, [{
    key: '_getThemeID',
    value: function _getThemeID(themeEl) {
      return themeEl.id.replace('theme_', '');
    }
  }, {
    key: '_getThemeName',
    value: function _getThemeName(themeEl) {
      return themeEl.querySelector('.themes-list__info a').innerText;
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

      this.themesList = this.themesIndex.querySelector('.themes-list');
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
