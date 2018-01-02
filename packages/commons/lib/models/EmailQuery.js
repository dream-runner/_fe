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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _utils = require('../utils');

var _Query2 = require('./Query');

var _Query3 = _interopRequireDefault(_Query2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailQuery = function (_Query) {
  (0, _inherits3.default)(EmailQuery, _Query);

  function EmailQuery() {
    (0, _classCallCheck3.default)(this, EmailQuery);
    return (0, _possibleConstructorReturn3.default)(this, _Query.apply(this, arguments));
  }

  EmailQuery.prototype.getDescriptor = function getDescriptor() {
    return {
      id: 'email',
      name: (0, _signavioI18n2.default)('Email-Addresses')
    };
  };

  EmailQuery.prototype.fetch = function fetch(query) {
    return new Promise(function (resolve) {
      if (_utils.StringUtils.validateEmail(query)) {
        resolve([{
          value: query,
          entity: query,
          type: 'email'
        }]);
      } else {
        resolve([]);
      }
    });
  };

  return EmailQuery;
}(_Query3.default);

exports.default = EmailQuery;


// WEBPACK FOOTER //
// ./packages/commons/lib/models/EmailQuery.js