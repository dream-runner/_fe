'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = Academic;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _licenseBase = require('./license-base');

var _licenseBase2 = _interopRequireDefault(_licenseBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Academic(props) {
  return _react2.default.createElement(
    _licenseBase2.default,
    (0, _extends3.default)({ title: (0, _signavioI18n2.default)('Academic') }, props),
    _react2.default.createElement(
      _licenseBase.Limitations,
      props,
      _react2.default.createElement(
        _licenseBase.List,
        null,
        _react2.default.createElement(
          _licenseBase.ListHeader,
          null,
          (0, _signavioI18n2.default)('Limited feature set')
        ),
        _react2.default.createElement(
          _licenseBase.ListHeader,
          null,
          (0, _signavioI18n2.default)('Needs to be reactivated every year using a valid academic email address')
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
// ./packages/organizations/lib/licenses/components/Academic.js