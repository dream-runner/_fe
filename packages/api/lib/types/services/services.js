'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

var _account = require('./account');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'services';

var serviceschema = new _normalizr.schema.Entity(collection, {
  accounts: [_account.schema]
}, { idAttribute: 'key' });
var schema = exports.schema = new _normalizr.schema.Array(serviceschema);

var fetch = exports.fetch = function fetch() {
  return (0, _callApi2.default)('services', schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/services/services.js