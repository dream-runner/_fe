'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.dictionaryAffectedWorkflowsSchema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'dictionaryAffectedWorkflows';
var dictionaryAffectedWorkflowsSchema = exports.dictionaryAffectedWorkflowsSchema = new _normalizr.schema.Entity(collection);

var schema = exports.schema = new _normalizr.schema.Array(dictionaryAffectedWorkflowsSchema);

var fetch = exports.fetch = function fetch(_ref) {
  var connectorId = _ref.connectorId,
      descriptorId = _ref.descriptorId;
  return (0, _callApi2.default)('dictionary/connectors/' + connectorId + '/actions/affected/' + descriptorId, schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/services/dictionaryAffectedWorkflows.js