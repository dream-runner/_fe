"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = splice;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function splice(array) {
  var copy = [].concat((0, _toConsumableArray3.default)(array));

  for (var _len = arguments.length, spliceArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    spliceArgs[_key - 1] = arguments[_key];
  }

  copy.splice.apply(copy, spliceArgs);
  return copy;
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/utils/splice.js