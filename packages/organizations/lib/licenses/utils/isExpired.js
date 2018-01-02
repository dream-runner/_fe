'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isExpired;

var _extensions = require('@signavio/effektif-commons/lib/extensions');

function isExpired(license) {
  return license.expirationDate && (0, _extensions.moment)(license.expirationDate).isBefore((0, _extensions.moment)());
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/utils/isExpired.js