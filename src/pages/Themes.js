export default class Themes {
  constructor() {
    this.themesList = document.querySelector('.themes-list');
    this.themesListHeader = null;
    this.themes = [];

    if (!this.themesList) {
      return;
    }

    this._init();
  }

  _getThemeID(themeEl) {
    return themeEl.id.replace('theme_', '');
  }

  /**
   * Get the theme name form title element, or get stored element
   * @param titleEl
   * @returns {string}
   * @private
   */
  _getThemeName(titleEl) {
    const dataTag = 'data-theme-title';
    const currentTitle = titleEl.innerText;
    const storedTitle = titleEl.getAttribute(dataTag);

    if (!storedTitle) {
      titleEl.setAttribute(dataTag, currentTitle);
      return currentTitle;
    } else {
      return storedTitle;
    }
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

  _organiseTheme(themeEl) {
    const titleEl = themeEl.querySelector('.themes-list__theme-title');

    const id = this._getThemeID(themeEl);
    const name = this._getThemeName(titleEl);
    const idText = `<span style="font-size: 0.9em">Theme ID: <span style="font-weight: normal;">${id}</span></span>`;

    titleEl.innerHTML = `${name}<br/>${idText}`;

    return {
      el: themeEl,
      id: this._getThemeID(themeEl),
      name: this._getThemeName(themeEl),
    };
  }

  _init() {
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
