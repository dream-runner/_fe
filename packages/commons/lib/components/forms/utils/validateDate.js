'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateDate;

var _extensions = require('../../../extensions');

function validateDate(value) {
  if (!value) {
    return undefined;
  }

  var date = (0, _extensions.moment)(value);

  if (!date.isValid()) {
    return undefined;
  }

  /*
  ISO8601 format
  While typing, some strings come as "incomplete", such as 0202-05-01
  Although moment returns this value as valid, it goes against ISO8601 format
  where year, for example, needs 4 digits
  */
  if (date.year() < 1000) {
    return undefined;
  }

  return date;
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/utils/validateDate.js