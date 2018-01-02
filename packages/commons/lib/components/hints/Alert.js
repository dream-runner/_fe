'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = Alert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _buttons = require('../buttons');

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Alert(_ref) {
  var children = _ref.children,
      onDismiss = _ref.onDismiss,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'onDismiss']);

  return _react2.default.createElement(
    _modal2.default,
    (0, _extends3.default)({}, rest, {
      onRequestHide: onDismiss,
      footer: _react2.default.createElement(
        _buttons.TextButton,
        { primary: true, block: true, onClick: onDismiss },
        (0, _signavioI18n2.default)('Ok')
      )
    }),
    children
  );
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/hints/Alert.js