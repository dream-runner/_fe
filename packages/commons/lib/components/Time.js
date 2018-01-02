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

var _ui = require('@signavio/ui');

var _styles = require('../styles');

var _moment = require('../extensions/moment');

var _moment2 = _interopRequireDefault(_moment);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapIf = function wrapIf(condition, wrapper, wrappee) {
  return condition ? (0, _react.cloneElement)(wrapper, { children: wrappee }) : wrappee;
};


function Time(_ref) {
  var hideIcon = _ref.hideIcon,
      time = _ref.time,
      _ref$format = _ref.format,
      format = _ref$format === undefined ? 'LLL' : _ref$format,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['hideIcon', 'time', 'format', 'style']);

  var showAsFromNow = !isBeforeToday(time);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style),
    wrapIf(showAsFromNow, _react2.default.createElement(_ui.Popover, {
      style: style('popover'),
      position: 'top',
      trigger: 'hover',
      popover: (0, _moment2.default)(time).format(format),
      small: true
    }), [!hideIcon && _react2.default.createElement(_Icon2.default, { style: style('icon'), small: true, icon: 'clock' }), showAsFromNow ? (0, _moment2.default)(time).fromNow().replace(/./, function (t) {
      return t.toUpperCase();
    }) : (0, _moment2.default)(time).format(format)])
  );
}

var isBeforeToday = function isBeforeToday(time) {
  return (0, _moment2.default)(time).isBefore((0, _moment2.default)().format('YYYY-MM-DD'));
};

exports.default = (0, _styles.defaultStyle)({
  popover: {
    display: 'inline-block'
  }
})(Time);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Time.js