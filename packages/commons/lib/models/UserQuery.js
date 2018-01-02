'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('../utils');

var _Query2 = require('./Query');

var _Query3 = _interopRequireDefault(_Query2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserQuery = function (_Query) {
  (0, _inherits3.default)(UserQuery, _Query);

  function UserQuery(organization, parameters) {
    (0, _classCallCheck3.default)(this, UserQuery);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Query.call(this));

    _this.organization = organization;
    _this.parameters = parameters || {};
    return _this;
  }

  UserQuery.prototype.fetch = function fetch(query) {
    var _this2 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new Promise(function (resolve) {
      _jquery2.default.ajax({
        url: _utils.LoginUtils.makeUrl('users', _this2.organization),
        data: (0, _extends3.default)({}, _this2.parameters, options, {
          name: query
        })
      }).then(function (results, status, xhr) {
        _this2.setSize(xhr);

        resolve(_this2.transformUsers(results));
      });
    });
  };

  UserQuery.prototype.getDescriptor = function getDescriptor() {
    return {
      id: 'user',
      size: this.size,
      name: (0, _signavioI18n2.default)('Users')
    };
  };

  UserQuery.prototype.transformUsers = function transformUsers(users) {
    return users.map(function (user) {
      return {
        value: user.firstName + ' ' + user.lastName,
        entity: user,
        type: 'user'
      };
    });
  };

  UserQuery.prototype.setParameters = function setParameters() {
    var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.parameters = parameters;
  };

  UserQuery.prototype.resetParameters = function resetParameters() {
    this.parameters = {};
  };

  return UserQuery;
}(_Query3.default);

exports.default = UserQuery;


// WEBPACK FOOTER //
// ./packages/commons/lib/models/UserQuery.js