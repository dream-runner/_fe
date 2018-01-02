'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

var _lookupBackboneCache = require('../../lookupBackboneCache');

var _lookupBackboneCache2 = _interopRequireDefault(_lookupBackboneCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'users';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id;
  return (0, _lookupBackboneCache2.default)('User', collection, id) || (0, _callApi2.default)('users/' + id, schema);
};

var update = exports.update = function update(_ref2, body) {
  var id = _ref2.id;
  return (0, _callApi2.default)('users/' + id, schema, { method: 'PUT', body: body });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/users/user.js