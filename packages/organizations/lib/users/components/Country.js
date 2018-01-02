'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flags = require('emoji-flags');

function Country(_ref) {
  var countryCode = _ref.countryCode,
      children = _ref.children,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['countryCode', 'children']);

  var countryFlag = flags.countryCode(countryCode);

  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({}, rest, {
      header: _react2.default.createElement(
        'span',
        rest.style('flag'),
        countryFlag && countryFlag.emoji
      )
    }),
    children
  );
}

exports.default = (0, _recompose.compose)(_recompose.pure, (0, _styles.defaultStyle)({
  flag: {
    lineHeight: _styles.variables.lineHeight.block + 'px',

    paddingLeft: _styles.padding.normal,
    paddingRight: _styles.padding.small
  }
}))(Country);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/Country.js