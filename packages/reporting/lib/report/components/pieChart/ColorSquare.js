'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorSquare = function ColorSquare(_ref) {
  var backgroundColor = _ref.backgroundColor;
  return _react2.default.createElement('div', {
    style: {
      width: _styles.variables.lineHeight.small,
      height: _styles.variables.lineHeight.small,
      backgroundColor: backgroundColor
    }
  });
};

exports.default = ColorSquare;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/pieChart/ColorSquare.js