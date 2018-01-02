'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMainLicense;

var _lodash = require('lodash');

function getMainLicense(licenses) {
  var licenseTypes = (0, _lodash.groupBy)(licenses, function (license) {
    return license.type;
  });
  var main = (0, _lodash.find)(['enterprise', 'professional', 'developer', 'academic'], function (type) {
    return !!licenseTypes[type];
  });

  if (!main) {
    return null;
  }

  return licenseTypes[main][0];
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/utils/getMainLicense.js