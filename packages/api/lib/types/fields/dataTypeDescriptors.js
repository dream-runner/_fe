'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

var _compositeId = require('../../compositeId');

var _compositeId2 = _interopRequireDefault(_compositeId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'dataTypeDescriptors';

var dataTypeDescriptorSchema = new _normalizr.schema.Entity(collection, {}, { idAttribute: (0, _compositeId2.default)('key', 'id') });
var schema = exports.schema = new _normalizr.schema.Array(dataTypeDescriptorSchema);

var fetch = exports.fetch = function fetch() {
  return (0, _callApi2.default)('typeDescriptors', schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/fields/dataTypeDescriptors.js