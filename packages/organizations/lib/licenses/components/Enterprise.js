'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = Enterprise;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _licenseBase = require('./license-base');

var _licenseBase2 = _interopRequireDefault(_licenseBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Enterprise(props) {
  return _react2.default.createElement(
    _licenseBase2.default,
    (0, _extends3.default)({}, props, { title: (0, _signavioI18n2.default)('You will be missing out on:') }),
    _react2.default.createElement(
      _licenseBase.Features,
      props,
      _react2.default.createElement(
        _licenseBase.List,
        null,
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _components.UserGuideLink,
            { chapter: 'processes' },
            (0, _signavioI18n2.default)('Process builder')
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _components.UserGuideLink,
            { chapter: 'forms' },
            (0, _signavioI18n2.default)('Form builder')
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _components.UserGuideLink,
            {
              chapter: 'action-types',
              section: 'google-drive-upload-file'
            },
            (0, _signavioI18n2.default)('Cloud connectors')
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          (0, _signavioI18n2.default)('LDAP connectivity / SSO')
        )
      )
    ),
    _react2.default.createElement(
      _licenseBase.Limitations,
      props,
      _react2.default.createElement(
        _licenseBase.List,
        null,
        _react2.default.createElement(
          'li',
          null,
          (0, _signavioI18n2.default)('1 GB / user file storage')
        ),
        _react2.default.createElement(
          'li',
          null,
          (0, _signavioI18n2.default)('Min. 12 months')
        )
      )
    ),
    _react2.default.createElement(
      _licenseBase.Support,
      props,
      (0, _signavioI18n2.default)('Business hours')
    )
  );
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/components/Enterprise.js