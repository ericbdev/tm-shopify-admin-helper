# About

Shopify Admin Helper is a userscript designed to work for TamperMonkey. Its main
purpose is to enhance the Admin experience to suit my specific needs.

# Functionality
- Automatically expands the "Online store" navigation panel of "Sales channels"
- Sort themes alphabetically on "/admin/themes" for consistent ordering

# Install

- Install browser extension
  - Chrome: Install [Tampermonkey](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
  - Safari: Install [Tampermonkey](https://tampermonkey.net/?ext=dhdg&browser=safari)
  - Firefox: Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
  - Internet Explorer: Unsupported
- Install user script
  - After installing browser extension, go [index.user.js](../../raw/master/dist/index.user.js) and click *Install*.
  
  
# Compatibility

Shopify Admin Helper uses EcmaScript2015, it is not guaranteed to work in older browsers,
or browser which do not properly support EcmaScript2015. It has not been tested
to work in Safari's TamperMonkey, or in GreaseMonkey.
  
# TODO:
- Add in additional theme information
  - Date last updated
  - Date created
  - Sort themes of same name by last updated