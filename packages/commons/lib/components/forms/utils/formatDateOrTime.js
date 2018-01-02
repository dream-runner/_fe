'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDateOrTime;

var _extensions = require('../../../extensions');

function formatDateOrTime(value, dateFormat) {
  if (value == null) {
    return null;
  }

  var momentDate = _extensions.moment.utc(value);

  if (!momentDate.isValid()) {
    return null;
  }

  return momentDate.format(dateFormat);
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/utils/formatDateOrTime.js