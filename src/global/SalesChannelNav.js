/**
 * Update SalesChannelNav
 */
export default class SalesChannelNav {
  constructor() {
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

  _expandOnlineStore() {
    this.onlineStore.classList.add('ui-nav__item--child-selected', 'ui-rollup__item--force-show');
    this.onlineStore.querySelector('ul').classList.add('ui-rollup--show');
  }
}
