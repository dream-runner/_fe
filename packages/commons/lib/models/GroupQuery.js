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

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('../utils');

var _Query2 = require('./Query');

var _Query3 = _interopRequireDefault(_Query2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupQuery = function (_Query) {
  (0, _inherits3.default)(GroupQuery, _Query);

  function GroupQuery(organization) {
    (0, _classCallCheck3.default)(this, GroupQuery);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Query.call(this));

    _this.organization = organization;
    return _this;
  }

  GroupQuery.prototype.fetch = function fetch(query, options) {
    var _this2 = this;

    return new Promise(function (resolve) {
      _jquery2.default.ajax({
        url: _utils.LoginUtils.makeUrl('groups', _this2.organization),
        data: (0, _extends3.default)({}, options, {
          name: query
        })
      }).then(function (result, status, xhr) {
        _this2.setSize(xhr);

        resolve(_this2.transformGroups(result));
      });
    });
  };

  GroupQuery.prototype.getDescriptor = function getDescriptor() {
    return {
      id: 'group',
      size: this.size,
      pagesize: GroupQuery.PAGE_SIZE,
      name: (0, _signavioI18n2.default)('Groups')
    };
  };

  GroupQuery.prototype.sortedGroups = function sortedGroups(groups) {
    return (0, _lodash.sortBy)(groups, function (group) {
      return group.name.toLowerCase();
    });
  };

  GroupQuery.prototype.transformGroups = function transformGroups(groups) {
    return (0, _lodash.map)(groups, function (group) {
      return {
        value: group.name,
        entity: group,
        type: 'group'
      };
    });
  };

  return GroupQuery;
}(_Query3.default);

GroupQuery.PAGE_SIZE = 5;
exports.default = GroupQuery;


// WEBPACK FOOTER //
// ./packages/commons/lib/models/GroupQuery.js