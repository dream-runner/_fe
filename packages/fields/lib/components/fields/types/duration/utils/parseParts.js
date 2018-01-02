'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = parseParts;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseParts(value, units) {
  var unit = units.slice(0, 1)[0];

  if (!unit) {
    return {};
  }

  var fit = Math.floor(value / unit.duration);

  return (0, _extends4.default)({}, parseParts(value - fit * unit.duration, units.slice(1)), (0, _defineProperty3.default)({}, unit.key, fit));
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/duration/utils/parseParts.js