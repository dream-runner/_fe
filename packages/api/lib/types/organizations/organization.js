'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'organizations';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id,
      admin = _ref.admin;

  if (admin) {
    return (0, _callApi.callAdminApi)('admin/organizations/' + id, schema);
  }
  if (id) {
    return (0, _callApi.callAdminApi)('organizations/' + id, schema);
  }
  return (0, _callApi2.default)('', schema);
};

var update = exports.update = function update(query, body) {
  return (0, _callApi2.default)('', schema, { method: 'PUT', body: body });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/organizations/organization.js