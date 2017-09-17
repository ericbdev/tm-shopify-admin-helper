/**
 * Update SalesChannelNav
 */
export default class SalesChannelNav {
  constructor() {
    this.onlineStore = document.querySelector('[data-app-nav-container-for="online_store"]');

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
