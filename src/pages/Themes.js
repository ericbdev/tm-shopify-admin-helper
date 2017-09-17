export default class Themes {
  constructor() {
    this.themesIndex = document.querySelector('#themes-index');
    this.themesListHeader = null;
    this.themes = [];

    if (!this.themesIndex) {
      return;
    }

    this._init();
  }

  _getThemeID(themeEl) {
    return themeEl.id.replace('theme_', '');
  }

  _getThemeName(themeEl) {
    return themeEl.querySelector('.themes-list__info a').innerText;
  }

  _orderThemes() {
    this.themes.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase

      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      // Theme names match, order by ID
      // TODO: Test this doesn't break everything
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

  _organiseTheme(themeEl) {
    return {
      el: themeEl,
      id: this._getThemeID(themeEl),
      name: this._getThemeName(themeEl),
    };
  }

  _init() {
    this.themesList = this.themesIndex.querySelector('.themes-list');
    this.themesListInner = this.themesList.querySelectorAll('.themes-list__row');

    this.themesListInner.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        // Is list header
        if (index === 0) {
          this.themesListHeader = el;
        // Is theme entry
        } else {
          this.themes.push(this._organiseTheme(el));
        }
      }
    });
    
    this._orderThemes();
    this._renderList();
  }

  _renderList() {
    this.themesList.innerHTML = '';
    this.themesList.appendChild(this.themesListHeader);

    this.themes.forEach((item) => {
      this.themesList.appendChild(item.el);
    });
  }
}
