'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = Show;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Show(_ref) {
  var value = _ref.value,
      small = _ref.small,
      transparent = _ref.transparent,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['value', 'small', 'transparent']);

  return _react2.default.createElement(
    _tiles.TextTile,
    { small: small, transparent: transparent },
    _react2.default.createElement(
      'a',
      (0, _extends3.default)({}, (0, _lodash.omit)(rest, 'type', 'style'), { href: 'mailto:' + value }),
      value
    )
  );
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/emailAddress/Show.js