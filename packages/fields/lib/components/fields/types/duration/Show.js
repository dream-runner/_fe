'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _utils = require('./utils');

var _higherOrder = require('./higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Show(_ref) {
  var value = _ref.value,
      small = _ref.small,
      transparent = _ref.transparent,
      units = _ref.units;

  return _react2.default.createElement(
    _tiles.TextTile,
    { small: small, transparent: transparent },
    (0, _utils.compileMessage)(value, units)
  );
}

exports.default = (0, _higherOrder.withDurationUnits)(Show);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/duration/Show.js