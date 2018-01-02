'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _effektifApi = require('@signavio/effektif-api');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _utils = require('../utils');

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LicenseOverview(_ref) {
  var fetchLicenses = _ref.fetchLicenses;

  if (fetchLicenses.loading) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true, view: true },
      (0, _signavioI18n2.default)('Loading license information...')
    );
  }

  var mainLicense = (0, _utils.getMainLicense)(fetchLicenses.value);

  return _react2.default.createElement(
    'div',
    { className: 'license-overview' },
    mainLicense && _react2.default.createElement(_components.ExpiryHeader, { license: mainLicense }),
    _react2.default.createElement(
      'div',
      { className: 'view-content' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-sm-4 col-sm-offset-4' },
          _react2.default.createElement(_components.License, { type: 'enterprise' })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'academic' },
        _react2.default.createElement(
          _hints.Hint,
          null,
          (0, _signavioI18n2.default)('Are you a student? Register for the __link__.', {
            markdown: true,
            link: _react2.default.createElement(
              _reactRouterDom.Link,
              { to: (0, _effektifApi.prependOrg)('/buy/academic') },
              (0, _signavioI18n2.default)('academic version')
            )
          })
        )
      )
    )
  );
}
exports.default = (0, _effektifApi.connect)(function () {
  return {
    fetchLicenses: {
      type: _effektifApi.types.LICENSES
    }
  };
})(LicenseOverview);


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/containers/LicenseOverview.js