'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bar = function Bar(_ref) {
  var width = _ref.width,
      backgroundColor = _ref.backgroundColor;
  return _react2.default.createElement('div', {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: width + '%',
      backgroundColor: backgroundColor
    }
  });
};

exports.default = Bar;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/barChart/Bar.js