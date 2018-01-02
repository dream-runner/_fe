'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _Query2 = require('./Query');

var _Query3 = _interopRequireDefault(_Query2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrganizationQuery = function (_Query) {
  (0, _inherits3.default)(OrganizationQuery, _Query);

  function OrganizationQuery(organization) {
    (0, _classCallCheck3.default)(this, OrganizationQuery);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Query.call(this));

    _this.organization = organization;
    return _this;
  }

  OrganizationQuery.prototype.getDescriptor = function getDescriptor() {
    return {
      id: 'organization',
      name: (0, _signavioI18n2.default)('Organizations')
    };
  };

  OrganizationQuery.prototype.fetch = function fetch(query) {
    var _this2 = this;

    return new Promise(function (resolve) {
      var organization = _this2.transformOrganizations(_this2.fetchOrganization(query));

      resolve(organization);
    });
  };

  OrganizationQuery.prototype.fetchOrganization = function fetchOrganization(query) {
    if (this.organization.name.toLowerCase().indexOf(query) === -1) {
      return [];
    }

    return [this.organization];
  };

  OrganizationQuery.prototype.transformOrganizations = function transformOrganizations(organizations) {
    return (0, _lodash.map)(organizations, function (organization) {
      return {
        value: organization.name,
        entity: organization,
        type: 'organization'
      };
    });
  };

  return OrganizationQuery;
}(_Query3.default);

exports.default = OrganizationQuery;


// WEBPACK FOOTER //
// ./packages/commons/lib/models/OrganizationQuery.js