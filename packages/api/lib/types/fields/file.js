'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

var _lookupBackboneCache = require('../../lookupBackboneCache');

var _lookupBackboneCache2 = _interopRequireDefault(_lookupBackboneCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'files';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id;
  return (0, _lookupBackboneCache2.default)('File', collection, id) || (0, _callApi2.default)('files/' + id, schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/fields/file.js