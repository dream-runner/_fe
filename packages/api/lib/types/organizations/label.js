'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.update = exports.create = exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'labels';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id;
  return (0, _callApi2.default)('labels/' + id, schema);
};

var create = exports.create = function create(body) {
  return (0, _callApi2.default)('labels', schema, { method: 'POST', body: body });
};

var update = exports.update = function update(_ref2, body) {
  var id = _ref2.id;
  return (0, _callApi2.default)('labels/' + id, schema, { method: 'PUT', body: body });
};

var remove = exports.remove = function remove(_ref3) {
  var id = _ref3.id;
  return (0, _callApi2.default)('labels/' + id, schema, { method: 'DELETE' });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/organizations/label.js