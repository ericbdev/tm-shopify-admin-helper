import Locations from './utils/Locations';
import SalesChannelNav from './global/SalesChannelNav';
import Themes from './pages/Themes';

export default class ShopifyAdminHelper {
  constructor() {
    this.locations = new Locations();

    this._init();
  }

  _init() {
    new SalesChannelNav();

    console.log(this.locations.getPage());

    // Pages
    if (this.locations.isPage('themes')) {
      new Themes();
    }
  }
}
