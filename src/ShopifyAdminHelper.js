import Locations from './utils/Locations';
import SalesChannelNav from './global/SalesChannelNav';
import Themes from './pages/Themes';

export default class ShopifyAdminHelper {
  constructor() {
    this.init = this._init.bind(this);

    document.addEventListener('page:update', this.init);
  }

  _init() {
    this.locations = new Locations();
    new SalesChannelNav();

    //Pages
    if (this.locations.isPage('themes')) {
      new Themes();
    }
  }
}
