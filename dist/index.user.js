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

var ShopifyAdminHelper = function ShopifyAdminHelper() {
  classCallCheck(this, ShopifyAdminHelper);

  console.log('SAH Loads up');
};

new ShopifyAdminHelper();

}());
