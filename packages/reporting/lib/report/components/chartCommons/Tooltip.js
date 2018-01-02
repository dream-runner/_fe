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

var _victory = require('victory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = function Tooltip(_ref) {
  var active = _ref.active,
      x = _ref.x,
      y = _ref.y,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['active', 'x', 'y']);

  if (active) {
    return _react2.default.createElement(_victory.VictoryLabel, (0, _extends3.default)({ x: x, y: y }, rest));
  } else {
    return null;
  }
};

exports.default = Tooltip;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/chartCommons/Tooltip.js