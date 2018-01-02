'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = emailAddress;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _utils = require('@signavio/effektif-commons/lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function emailAddress(value) {
  var i = (value || '').indexOf('<');
  var j = (value || '').indexOf('>');
  var email = i && j && j > i ? (value || '').substring(i + 1, j) : value;

  if (!_utils.StringUtils.validateEmail(email)) {
    return [(0, _signavioI18n2.default)('Please enter a valid email address.')];
  }

  return [];
}


// WEBPACK FOOTER //
// ./packages/fields/lib/utils/validators/emailAddress.js