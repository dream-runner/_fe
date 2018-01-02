'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function View(_ref) {
  var children = _ref.children,
      style = _ref.style;

  return _react2.default.createElement(
    'div',
    style,
    children
  );
}

var styled = (0, _styles.defaultStyle)({
  position: 'relative',

  '&flex': {
    display: 'flex'
  },

  '&flexRow': {
    flexDirection: 'row'
  }
}, function (_ref2) {
  var flex = _ref2.flex,
      flexRow = _ref2.flexRow;
  return {
    '&flex': flex,
    '&flexRow': flexRow
  };
});

exports.default = styled(View);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/View.js