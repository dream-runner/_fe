'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LicenseLink;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _effektifApi = require('@signavio/effektif-api');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LicenseLink(_ref) {
  var licenseId = _ref.licenseId,
      licenseType = _ref.licenseType;

  return _react2.default.createElement(
    _reactRouterDom.Link,
    { to: (0, _effektifApi.prependOrg)('/admin/auth/licenses/' + licenseId) },
    (0, _utils.findLicenseNameByType)(licenseType)
  );
}


// WEBPACK FOOTER //
// ./packages/admin/lib/events/components/LicenseLink.js