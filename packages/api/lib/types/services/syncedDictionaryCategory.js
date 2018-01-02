'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.create = exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'syncedDictionaryCategory';
var schema = exports.schema = new _normalizr.schema.Entity(collection);

var fetch = exports.fetch = function fetch() {
  return { response: null };
};

var create = exports.create = function create(_ref) {
  var connectorId = _ref.connectorId,
      categoryId = _ref.categoryId;
  return (0, _callApi2.default)('dictionary/connectors/' + connectorId + '/actions/sync/' + categoryId, schema, {
    method: 'POST'
  });
};

var remove = exports.remove = function remove(_, _ref2) {
  var connectorId = _ref2.connectorId,
      descriptorId = _ref2.descriptorId;
  return (0, _callApi2.default)('dictionary/connectors/' + connectorId + '/actions/sync/' + descriptorId, schema, {
    method: 'DELETE'
  });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/services/syncedDictionaryCategory.js