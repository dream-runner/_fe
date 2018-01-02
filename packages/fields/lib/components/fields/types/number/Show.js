'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Show;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _utils = require('../../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Show(_ref) {
  var value = _ref.value,
      small = _ref.small,
      transparent = _ref.transparent;

  return _react2.default.createElement(
    _tiles.TextTile,
    { small: small, transparent: transparent },
    (0, _utils.toLocaleString)(value)
  );
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/number/Show.js