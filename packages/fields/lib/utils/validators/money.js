'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!options.required) {
    return [];
  }

  if (!(0, _lodash.isNumber)((value || {}).amount) || (0, _lodash.isNaN)((value || {}).amount)) {
    return [(0, _signavioI18n2.default)('Please enter a valid number.')];
  }

  if (!value.currency) {
    return [(0, _signavioI18n2.default)('Please enter a valid currency.')];
  }

  return [];
};

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


// WEBPACK FOOTER //
// ./packages/fields/lib/utils/validators/money.js