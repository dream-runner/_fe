'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'accounts';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var remove = exports.remove = function remove(_, _ref) {
  var serviceKey = _ref.serviceKey,
      accountId = _ref.accountId;
  return (0, _callApi2.default)('services/' + serviceKey + '/accounts/' + accountId, schema, {
    method: 'DELETE'
  });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/services/account.js