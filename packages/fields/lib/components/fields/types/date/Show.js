'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Show;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Show(_ref) {
  var type = _ref.type,
      value = _ref.value,
      small = _ref.small,
      transparent = _ref.transparent;

  return _react2.default.createElement(
    _tiles.TextTile,
    { small: small, transparent: transparent },
    getValue(type, value)
  );
}

var getValue = function getValue(type, value) {
  var format = (0, _utils.getFormatForKind)(type.kind);

  if (type.kind === 'datetime') {
    return (0, _forms.formatDateTime)(value, format);
  }

  return (0, _forms.formatDateOrTime)(value, format);
};


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/date/Show.js