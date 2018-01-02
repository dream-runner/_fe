'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isExpired = exports.getMainLicense = exports.getUnusedLicenseCount = undefined;

var _getUnusedLicenseCount2 = require('./getUnusedLicenseCount');

var _getUnusedLicenseCount3 = _interopRequireDefault(_getUnusedLicenseCount2);

var _getMainLicense2 = require('./getMainLicense');

var _getMainLicense3 = _interopRequireDefault(_getMainLicense2);

var _isExpired2 = require('./isExpired');

var _isExpired3 = _interopRequireDefault(_isExpired2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getUnusedLicenseCount = _getUnusedLicenseCount3.default;
exports.getMainLicense = _getMainLicense3.default;
exports.isExpired = _isExpired3.default;


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/utils/index.js