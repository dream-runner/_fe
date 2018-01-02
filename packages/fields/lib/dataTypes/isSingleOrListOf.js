'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSingleOrListOf;

var _isList = require('./isList');

var _isList2 = _interopRequireDefault(_isList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isSingleOrListOf(type, typeName) {
  return (0, _isList2.default)(type) ? type.elementType.name === typeName : type.name === typeName;
}


// WEBPACK FOOTER //
// ./packages/fields/lib/dataTypes/isSingleOrListOf.js