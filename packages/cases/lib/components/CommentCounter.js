'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentCounter = function CommentCounter(_ref) {
  var children = _ref.children,
      style = _ref.style;
  return _react2.default.createElement(
    'div',
    style,
    children
  );
};

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      padding = _ref2.padding,
      font = _ref2.font;

  var size = padding.large * 2 / 3;

  return {
    display: 'inline-block',

    borderRadius: size,

    backgroundColor: color.mono.middle,
    color: _styles.utils.color(color.mono.middle),

    lineHeight: size + 'px',
    paddingLeft: padding.small,
    paddingRight: padding.small,

    fontSize: font.size.form
  };
});

exports.default = styled(CommentCounter);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/CommentCounter.js