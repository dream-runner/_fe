'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OrganizationLink;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _effektifApi = require('@signavio/effektif-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OrganizationLink(_ref) {
  var organization = _ref.organization;

  return _react2.default.createElement(
    _reactRouterDom.Link,
    { to: (0, _effektifApi.prependOrg)('/admin/organization/' + organization.id) },
    organization.name
  );
}


// WEBPACK FOOTER //
// ./packages/admin/lib/events/components/OrganizationLink.js