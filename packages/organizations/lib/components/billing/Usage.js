'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Usage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Usage(_ref) {
  var license = _ref.license,
      unused = _ref.unused;

  if (unused === 0) {
    return _react2.default.createElement(
      _hints.Hint,
      { warning: true },
      (0, _signavioI18n2.default)("You don't have any licenses left. This means you cannot invite new members to your organization. Please contact us at [sales@signavio.com](mailto:sales@signavio.com) to get more information.", {
        markdown: true
      })
    );
  }

  return _react2.default.createElement(
    _hints.Hint,
    { info: true, view: true },
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        unused === Number.POSITIVE_INFINITY ? (0, _signavioI18n2.default)('You have unlimited licenses.') : (0, _signavioI18n2.default)('You have one unused license left.', 'You have __count__ unused licenses left.', {
          count: unused
        })
      ),
      _react2.default.createElement(
        'li',
        null,
        license.expirationDate ? (0, _signavioI18n2.default)('Your license will expire on __date__', 'Your licenses will expire on __date__', {
          count: unused,
          date: (0, _extensions.moment)(license.expirationDate).format('LL')
        }) : (0, _signavioI18n2.default)('Your license does not expire.')
      ),
      _react2.default.createElement(
        'li',
        null,
        (0, _signavioI18n2.default)('For more information please contact us at [sales@signavio.com](mailto:sales@signavio.com).', {
          markdown: true
        })
      )
    )
  );
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/components/billing/Usage.js