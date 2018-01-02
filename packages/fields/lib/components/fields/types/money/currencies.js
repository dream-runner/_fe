'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrencies = undefined;
exports.getCurrency = getCurrency;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCurrencies = exports.getCurrencies = function getCurrencies() {
  return {
    EUR: (0, _signavioI18n2.default)('Euro'),
    USD: (0, _signavioI18n2.default)('US dollar'),
    JPY: (0, _signavioI18n2.default)('Japanese yen'),
    BGN: (0, _signavioI18n2.default)('Bulgarian lev'),
    CZK: (0, _signavioI18n2.default)('Czech koruna'),
    DKK: (0, _signavioI18n2.default)('Danish krone'),
    GBP: (0, _signavioI18n2.default)('Pound sterling'),
    HUF: (0, _signavioI18n2.default)('Hungarian forint'),
    LTL: (0, _signavioI18n2.default)('Lithuanian litas'),
    PLN: (0, _signavioI18n2.default)('Polish zloty'),
    RON: (0, _signavioI18n2.default)('New Romanian leu 1'),
    SEK: (0, _signavioI18n2.default)('Swedish krona'),
    CHF: (0, _signavioI18n2.default)('Swiss franc'),
    NOK: (0, _signavioI18n2.default)('Norwegian krone'),
    HRK: (0, _signavioI18n2.default)('Croatian kuna'),
    RUB: (0, _signavioI18n2.default)('Russian rouble'),
    TRY: (0, _signavioI18n2.default)('Turkish lira'),
    AUD: (0, _signavioI18n2.default)('Australian dollar'),
    BRL: (0, _signavioI18n2.default)('Brasilian real'),
    CAD: (0, _signavioI18n2.default)('Canadian dollar'),
    CNY: (0, _signavioI18n2.default)('Chinese yuan renminbi'),
    HKD: (0, _signavioI18n2.default)('Hong Kong dollar'),
    IDR: (0, _signavioI18n2.default)('Indonesian rupiah'),
    ILS: (0, _signavioI18n2.default)('Israeli shekel'),
    INR: (0, _signavioI18n2.default)('Indian rupee'),
    KRW: (0, _signavioI18n2.default)('South Korean won'),
    MXN: (0, _signavioI18n2.default)('Mexican peso'),
    MYR: (0, _signavioI18n2.default)('Malaysian ringgit'),
    NZD: (0, _signavioI18n2.default)('New Zealand dollar'),
    PHP: (0, _signavioI18n2.default)('Philippine peso'),
    SGD: (0, _signavioI18n2.default)('Singapore dollar'),
    THB: (0, _signavioI18n2.default)('Thai baht'),
    ZAR: (0, _signavioI18n2.default)('South African rand')
  };
};
function getCurrency(name) {
  return getCurrencies()[name];
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/money/currencies.js