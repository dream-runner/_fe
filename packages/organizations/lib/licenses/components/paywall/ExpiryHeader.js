'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ExpiryHeader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _effektifCommons = require('@signavio/effektif-commons');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ExpiryHeader(_ref) {
  var license = _ref.license;

  if ((0, _utils.isExpired)(license)) {
    return _react2.default.createElement(
      'div',
      { className: 'view-header' },
      _react2.default.createElement(
        'h1',
        null,
        (0, _signavioI18n2.default)('Your license has expired')
      ),
      _react2.default.createElement(
        _hints.Hint,
        null,
        (0, _signavioI18n2.default)('Your current __applicationName__ license has expired. This means that in order to continue to use ' + '__applicationName__ you need to purchase a license for your organization.', { applicationName: _effektifCommons.applicationName })
      )
    );
  }

  return _react2.default.createElement(
    'div',
    { className: 'view-header' },
    _react2.default.createElement(
      'h1',
      null,
      (0, _signavioI18n2.default)('Your license is about to expire')
    ),
    _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)('Your current __applicationName__ license is about to expire. ' + 'After the license is expired you will not be able to use __applicationName__ ' + 'anymore unless you choose to purchase another license.', { applicationName: _effektifCommons.applicationName })
    )
  );
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/components/paywall/ExpiryHeader.js