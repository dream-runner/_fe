'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDateTime;

var _lodash = require('lodash');

var _validateDate = require('./validateDate');

var _validateDate2 = _interopRequireDefault(_validateDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatDateTime(value, dateFormat) {
  var validatedDate = (0, _validateDate2.default)(value);

  if ((0, _lodash.isNil)(validatedDate)) {
    return null;
  }

  return validatedDate.format(dateFormat);
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/utils/formatDateTime.js