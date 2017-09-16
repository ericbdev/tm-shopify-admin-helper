// ==UserScript==
// @name            Shopify Admin Helper
// @version         0.0.1
// @author          ericbdev
// @namespace       sah
// @description     Enhances Shopify's admin panel for developers
// @downloadURL     https://github.com/ericbdev/tm-shopify-admin-helper/raw/master/dist/index.user.js
// @match           https://*.myshopify.com/admin/*
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

    console.log(this.location);
    console.log(this.pathname);
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

    this._expandOnlineStore();
  }

  createClass(SalesChannelNav, [{
    key: '_expandOnlineStore',
    value: function _expandOnlineStore() {
      if (!this.onlineStore) {
        return console.warn('No \'Online Store\' menu found');
      }

      console.log('Preparing to expand \'Online Store\' menu');

      this.onlineStore.classList.add('ui-nav__item--child-selected', 'ui-rollup__item--force-show');
      this.onlineStore.querySelector('ul').classList.add('ui-rollup--show');
    }
  }]);
  return SalesChannelNav;
}();

var Themes = function Themes() {
  classCallCheck(this, Themes);

  console.log('Todo: Enhance themes list');
};

var ShopifyAdminHelper = function () {
  function ShopifyAdminHelper() {
    classCallCheck(this, ShopifyAdminHelper);

    this.locations = new Locations();

    this._init();
  }

  createClass(ShopifyAdminHelper, [{
    key: '_init',
    value: function _init() {
      new SalesChannelNav();

      console.log(this.locations.getPage());

      // Pages
      if (this.locations.isPage('themes')) {
        new Themes();
      }
    }
  }]);
  return ShopifyAdminHelper;
}();

new ShopifyAdminHelper();

}());
