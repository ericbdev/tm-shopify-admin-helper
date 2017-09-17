export default class Locations {
  constructor() {
    this.location = window.location;
    this.pathname = this.location.pathname;
    this.page = this.pathname.replace('/admin/', '');
  }

  getPage() {
    return this.page;
  }

  isPage(page) {
    return (page === this.page);
  }
}
