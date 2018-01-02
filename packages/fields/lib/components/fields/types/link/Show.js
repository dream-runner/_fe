'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShowLink = function ShowLink(_ref) {
  var value = _ref.value,
      small = _ref.small,
      transparent = _ref.transparent;
  return _react2.default.createElement(
    _tiles.TextTile,
    { small: small, transparent: transparent },
    _react2.default.createElement(
      'a',
      { href: value, rel: 'external' },
      value.replace(/^.*?:\/+/i, '')
    )
  );
};

exports.default = ShowLink;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/link/Show.js