'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoValue;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoValue(_ref) {
  var type = _ref.type;

  return _react2.default.createElement(
    'span',
    null,
    (0, _utils.getNoValueMessageForKind)(type.kind)
  );
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/date/NoValue.js