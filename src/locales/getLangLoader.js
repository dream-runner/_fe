import { includes } from 'lodash'

import config from './config'

const supportedLocales = ['en_GB', 'en_US', 'de_DE', 'fr_FR', 'es_ES']

export default function getLangLoader(locale) {
  // A runtime exception will be throw every time that the requested locale file
  // cannot be found. Webpack uses a regular expression to build all locales as
  // separate bundles.
  let localeToLoad = locale

  if (!includes(supportedLocales, locale)) {
    localeToLoad = config.default
  }

  const bundleLoader = import(`./${localeToLoad}.js`)

  return callback => bundleLoader.then(content => callback(content.default))
}



// WEBPACK FOOTER //
// ./src/locales/getLangLoader.js