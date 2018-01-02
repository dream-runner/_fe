'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = hintIfDisabled;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hintIfDisabled() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var position = _ref.position,
      popoverRest = (0, _objectWithoutProperties3.default)(_ref, ['position']);

  return function (WrappedComponet) {
    return function (_ref2) {
      var disabled = _ref2.disabled,
          hint = _ref2.hint,
          rest = (0, _objectWithoutProperties3.default)(_ref2, ['disabled', 'hint']);

      if (disabled) {
        return _react2.default.createElement(
          _Popover2.default,
          (0, _extends3.default)({}, popoverRest, { position: position, popover: hint }),
          _react2.default.createElement(WrappedComponet, (0, _extends3.default)({ disabled: true }, rest))
        );
      }

      return _react2.default.createElement(WrappedComponet, rest);
    };
  };
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/higher-order/hintIfDisabled.js