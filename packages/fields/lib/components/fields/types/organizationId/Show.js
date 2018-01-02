'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.ShowOrganizationIdPure = ShowOrganizationIdPure;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _reactRouterDom = require('react-router-dom');

var _effektifApi = require('@signavio/effektif-api');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _connectSpinning = require('../../higher-order/connectSpinning');

var _connectSpinning2 = _interopRequireDefault(_connectSpinning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectValue = (0, _connectSpinning2.default)(function (_ref) {
  var value = _ref.value,
      admin = _ref.admin;
  return {
    organization: {
      query: { id: value, admin: admin },
      type: _effektifApi.types.ORGANIZATION
    }
  };
});

function ShowOrganizationIdPure(_ref2) {
  var admin = _ref2.admin,
      organization = _ref2.organization,
      small = _ref2.small,
      transparent = _ref2.transparent,
      highlightedName = _ref2.highlightedName;

  var name = highlightedName || organization.name;

  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({
      icon: 'organization'
    }, { small: small, transparent: transparent }, {
      subtitle: organization.admin && (0, _signavioI18n2.default)('Administrator')
    }),
    admin ? _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/admin/organization/' + organization.id },
      name
    ) : name
  );
}

exports.default = connectValue(ShowOrganizationIdPure);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/organizationId/Show.js