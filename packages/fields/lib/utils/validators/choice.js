'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = choice;

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function choice(value, _ref) {
  var type = _ref.type;

  if (!(0, _lodash.find)(type.options, { id: value })) {
    return [(0, _signavioI18n2.default)('Please select one of the available options.')];
  }

  return [];
}


// WEBPACK FOOTER //
// ./packages/fields/lib/utils/validators/choice.js