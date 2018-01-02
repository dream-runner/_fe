'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findLicenseNameByType;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _Effektif = require('singleton/Effektif');

var _Effektif2 = _interopRequireDefault(_Effektif);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findLicenseNameByType(type) {
  if (!type) {
    return (0, _signavioI18n2.default)('Unkown license type');
  }

  return _Effektif2.default.config().getLicenseType(type).get('name');
}


// WEBPACK FOOTER //
// ./packages/admin/lib/events/utils/findLicenseNameByType.js