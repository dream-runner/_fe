'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUnusedLicenseCount;

var _lodash = require('lodash');

function getUnusedLicenseCount(licenses, type) {
  return (0, _lodash.reduce)(licenses, function (result, license) {
    if (license.type !== type) {
      return result;
    }

    return Math.max(result, license.isGenerator ? Number.POSITIVE_INFINITY : license.unused);
  }, 0);
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/utils/getUnusedLicenseCount.js