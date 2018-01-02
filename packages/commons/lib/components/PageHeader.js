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

var _styles = require('../styles');

var _hints = require('./hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PageHeader(_ref) {
  var children = _ref.children,
      hint = _ref.hint,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'hint', 'style']);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style),
    _react2.default.createElement(
      'h2',
      null,
      children,
      hint && _react2.default.createElement(
        _hints.Hint,
        { style: style('hint') },
        hint
      )
    )
  );
}
exports.default = (0, _styles.defaultStyle)({
  paddingBottom: _styles.padding.large,

  fontWeight: _styles.font.weight.light,

  hint: {
    fontSize: _styles.font.size.normal,
    fontFamily: _styles.font.family.normal,

    marginTop: _styles.padding.normal,
    marginBottom: 0,
    paddingLeft: 0,

    textAlign: 'left'
  }
})(PageHeader);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/PageHeader.js