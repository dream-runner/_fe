'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _effektifApi = require('@signavio/effektif-api');

var _effektifCommons = require('@signavio/effektif-commons');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _licenses = require('../../licenses');

var _Usage = require('./Usage');

var _Usage2 = _interopRequireDefault(_Usage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Billing(props) {
  var fetchLicenses = props.fetchLicenses;


  if (fetchLicenses.loading) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true, view: true },
      (0, _signavioI18n2.default)('Loading license information...')
    );
  }

  var mainLicense = (0, _licenses.getMainLicense)(fetchLicenses.value);

  if (!mainLicense) {
    return _react2.default.createElement(
      _hints.Hint,
      { info: true },
      (0, _signavioI18n2.default)('You are using a very restricted version of __applicationName__. To unleash the real potential choose talk to our [sales team](mailto:sales@signavio.com).', {
        markdown: true,
        applicationName: _effektifCommons.applicationName
      })
    );
  }

  return _react2.default.createElement(
    'div',
    { className: 'row' },
    _react2.default.createElement(
      'div',
      { className: 'col-sm-3' },
      _react2.default.createElement(_licenses.License, { type: mainLicense.type, condensed: true }),
      mainLicense.id !== 'academic' && _react2.default.createElement(
        _hints.Hint,
        { small: true },
        (0, _signavioI18n2.default)('Student? __link__.', {
          markdown: true,
          link: _react2.default.createElement(
            _reactRouterDom.Link,
            { to: (0, _effektifApi.prependOrg)('/buy/academic') },
            (0, _signavioI18n2.default)('Click here')
          )
        })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'col-sm-9' },
      _react2.default.createElement(_Usage2.default, {
        license: mainLicense,
        unused: (0, _licenses.getUnusedLicenseCount)(fetchLicenses.value, mainLicense.type)
      })
    )
  );
}

exports.default = (0, _effektifApi.connect)(function () {
  return {
    fetchLicenses: {
      type: _effektifApi.types.LICENSES
    }
  };
})(Billing);


// WEBPACK FOOTER //
// ./packages/organizations/lib/components/billing/Billing.js