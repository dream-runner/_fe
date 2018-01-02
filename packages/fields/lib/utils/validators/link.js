'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = link;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _utils = require('@signavio/effektif-commons/lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function link(value) {
  if (!_utils.StringUtils.validateUrl(value)) {
    return [(0, _signavioI18n2.default)('Please enter a valid URL.')];
  }

  return [];
}


// WEBPACK FOOTER //
// ./packages/fields/lib/utils/validators/link.js