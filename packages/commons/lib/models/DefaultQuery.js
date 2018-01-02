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

var DefaultQuery = function (_Query) {
  (0, _inherits3.default)(DefaultQuery, _Query);

  function DefaultQuery(data) {
    (0, _classCallCheck3.default)(this, DefaultQuery);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Query.call(this));

    _this.data = data || [];
    return _this;
  }

  DefaultQuery.prototype.getDescriptor = function getDescriptor() {
    return {
      id: 'default',
      name: (0, _signavioI18n2.default)('Values')
    };
  };

  DefaultQuery.prototype.fetch = function fetch(query) {
    var results = (0, _lodash.filter)(this.data, function (item) {
      if (item.id === '__clear__') {
        return true;
      }

      return item.value.toLowerCase().indexOf(query) >= 0;
    });

    return new Promise(function (resolve) {
      resolve(results);
    });
  };

  return DefaultQuery;
}(_Query3.default);

exports.default = DefaultQuery;


// WEBPACK FOOTER //
// ./packages/commons/lib/models/DefaultQuery.js