'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identifyDecimalSeparator() {
  var n = 1.1;
  n = n.toLocaleString().substring(1, 2);
  return n;
}

var DECIMAL_SEPARATOR = identifyDecimalSeparator();

module.exports = {
  parseFloat: function (_parseFloat) {
    function parseFloat(_x) {
      return _parseFloat.apply(this, arguments);
    }

    parseFloat.toString = function () {
      return _parseFloat.toString();
    };

    return parseFloat;
  }(function (str) {
    str = str.replace(/\s/g, '');

    var commaOccurences = str.split(',').length - 1;
    var dotOccurences = str.split('.').length - 1;

    var thousandsSeparator;
    if (commaOccurences > 1) thousandsSeparator = ',';
    if (dotOccurences > 1) thousandsSeparator = '.';

    if (commaOccurences === 1 && dotOccurences === 1) {
      thousandsSeparator = str.indexOf('.') > str.indexOf(',') ? thousandsSeparator = ',' : thousandsSeparator = '.';
    }

    if (commaOccurences === 1 && dotOccurences === 0 && DECIMAL_SEPARATOR === '.') {
      if (str.length - str.indexOf(',') - 1 !== 3 || str.indexOf(',') > 3) {
        thousandsSeparator = '.';
      }
    }
    if (commaOccurences === 0 && dotOccurences === 1 && DECIMAL_SEPARATOR === ',') {
      if (str.length - str.indexOf('.') - 1 !== 3 || str.indexOf('.') > 3) {
        thousandsSeparator = ',';
      }
    }

    if (!thousandsSeparator) {
      thousandsSeparator = DECIMAL_SEPARATOR === ',' ? '.' : ',';
    }

    var decimalSeparator = thousandsSeparator === ',' ? '.' : ',';

    str = str.replace(new RegExp('\\' + thousandsSeparator, 'g'), '');
    str = str.replace(new RegExp('\\' + decimalSeparator, 'g'), '.');

    return parseFloat(str, 10);
  }),

  getDecimalSeparator: function getDecimalSeparator() {
    return DECIMAL_SEPARATOR;
  },

  // Returns the string representation of the given number with the localized
  // decimal separator.
  // Differs from JavaScript's Number.toLocaleString() in that it shows all
  // decimal places and does not print thousands separators,
  toLocaleString: function toLocaleString(number) {
    if (!_lodash2.default.isNumber(number) || _lodash2.default.isNaN(number)) {
      return '';
    }

    var result = number.toString();
    if (DECIMAL_SEPARATOR === ',') {
      result = result.replace('.', ',');
    }
    return result;
  },

  getDefaultCurrency: function getDefaultCurrency() {
    var lang = navigator.language || navigator.userLanguage;

    if (lang === 'en-US') return 'USD';
    if (lang === 'en-GB') return 'GBP';
    return 'EUR';
  }
};


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/NumberUtils.js