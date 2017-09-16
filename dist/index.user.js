// ==UserScript==
// @name            Shopify Admin Helper
// @version         0.0.1
// @author          ericbdev
// @namespace       sah
// @description     Enhances Shopify's admin panel for developers
// @downloadURL     https://github.com/ericbdev/tm-shopify-admin-helper/raw/master/dist/index.user.js
// @match           https://*.myshopify.com/admin
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

var ShopifyAdminHelper = function ShopifyAdminHelper() {
  classCallCheck(this, ShopifyAdminHelper);

  console.log('Shopify Admin Helper is loading');

  new SalesChannelNav();
};

new ShopifyAdminHelper();

}());
