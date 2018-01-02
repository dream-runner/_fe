'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Box = function Box(_ref) {
  var children = _ref.children,
      style = _ref.style;
  return _react2.default.createElement(
    'div',
    style,
    children
  );
};

var getModifiers = function getModifiers(props) {
  return {
    '&white': props.white
  };
};

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      padding = _ref2.padding;
  return {
    backgroundColor: color.mono.ultralight,
    paddingTop: padding.normal,
    paddingRight: padding.normal,
    paddingBottom: padding.normal,
    paddingLeft: padding.normal,

    '&white': {
      backgroundColor: 'white'
    }
  };
}, getModifiers);

exports.default = styled(Box);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Box.js