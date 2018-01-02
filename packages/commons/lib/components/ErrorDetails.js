'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trackJs = window.trackJs;

var ErrorDetails = function ErrorDetails(_ref) {
  var debug = _ref.debug,
      children = _ref.children;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      (0, _signavioI18n2.default)('An error prevents this part of the application from working correctly.')
    ),
    _react2.default.createElement(
      'p',
      null,
      (0, _signavioI18n2.default)('We apologize for the inconvenience.')
    ),
    debug && children,
    trackJs && _react2.default.createElement(
      'p',
      null,
      (0, _signavioI18n2.default)('The Signavio development team has already been notified about the problem. ' + 'We are giving our best to fix it as soon as possible.')
    )
  );
};

exports.default = ErrorDetails;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ErrorDetails.js