'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _callApi = require('../../callApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'adminEvents';

var schema = exports.schema = new _normalizr.schema.Array(new _normalizr.schema.Entity(collection));

var fetch = exports.fetch = function fetch(options) {
  return (0, _callApi.callAdminApi)('admin/events?' + _queryString2.default.stringify(options), schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/admin/adminEvents.js