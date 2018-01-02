'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toLocaleString = toLocaleString;
exports.getDecimalSeparator = getDecimalSeparator;
exports.getDefaultCurrency = getDefaultCurrency;

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

function identifyDecimalSeparator() {
  return 1.1.toLocaleString().substring(1, 2);
}

var DECIMAL_SEPARATOR = identifyDecimalSeparator();

// Returns the string representation of the given number with the localized
// decimal separator.
// Differs from JavaScript's Number.toLocaleString() in that it shows all
// decimal places and does not print thousands separators,
function toLocaleString(number) {
  if (!(0, _lodash.isNumber)(number) || (0, _lodash.isNaN)(number)) {
    return '';
  }

  var result = number.toFixed(2);

  if (DECIMAL_SEPARATOR === ',') {
    result = result.replace('.', ',');
  }

  return result;
}

function getDecimalSeparator() {
  return DECIMAL_SEPARATOR;
}

function getDefaultCurrency() {
  var lang = (0, _signavioI18n.locale)() || (navigator.language || navigator.userLanguage).replace('-', '_');

  switch (lang) {
    case 'en_US':
      return 'USD';
    case 'en_GB':
      return 'GBP';
    default:
      return 'EUR';
  }
}


// WEBPACK FOOTER //
// ./packages/fields/lib/utils/number.js