'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Show;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _utils = require('../../../../utils');

var _currencies = require('./currencies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Show(_ref) {
  var emptyContent = _ref.emptyContent,
      value = _ref.value,
      small = _ref.small,
      transparent = _ref.transparent;

  return _react2.default.createElement(
    _tiles.TextTile,
    { small: small, transparent: transparent },
    (0, _lodash.isNumber)(value.amount) && _react2.default.createElement(
      _components.Popover,
      { small: true, popover: (0, _currencies.getCurrency)(value.currency) },
      _react2.default.createElement(
        'span',
        null,
        value.currency
      )
    ),
    ' ',
    (0, _lodash.isNumber)(value.amount) ? (0, _utils.toLocaleString)(value.amount) : emptyContent
  );
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/money/Show.js