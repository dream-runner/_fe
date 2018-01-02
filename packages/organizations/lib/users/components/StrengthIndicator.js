'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STRENGH_INTERVALS = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StrengthIndicator(_ref) {
  var style = _ref.style,
      props = (0, _objectWithoutProperties3.default)(_ref, ['style']);

  var rest = (0, _lodash.omit)(props, 'strength');

  return _react2.default.createElement('div', (0, _extends4.default)({}, rest, style));
}

var STRENGH_INTERVALS = exports.STRENGH_INTERVALS = 10;

var strengthIntervals = function strengthIntervals(intervals, startColor) {
  return (0, _lodash.range)(intervals).reduce(function (result, interval) {
    return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, '&level' + interval, {
      width: interval * 100 / intervals + '%',
      backgroundColor: (0, _color2.default)(startColor).rotate(interval * (180 / intervals)).string()
    }));
  }, {});
};

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      padding = _ref2.padding;
  return (0, _extends4.default)({
    height: padding.xsmall,
    minWidth: STRENGH_INTERVALS / 100 + '%'

  }, _styles.utils.transition(['width', 'background-color']), strengthIntervals(STRENGH_INTERVALS, color.status.danger));
}, function (_ref3) {
  var _ref3$strength = _ref3.strength,
      strength = _ref3$strength === undefined ? 0 : _ref3$strength;
  return (0, _defineProperty3.default)({}, '&level' + strength, true);
});

exports.default = styled(StrengthIndicator);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/StrengthIndicator.js