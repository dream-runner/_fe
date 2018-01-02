'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Clearfix(_ref) {
  var style = _ref.style;

  return _react2.default.createElement('div', style);
}

var styled = (0, _styles.defaultStyle)(function () {
  return {
    clear: 'both',
    visibility: 'hidden',
    height: 0
  };
});

exports.default = styled(Clearfix);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Clearfix.js