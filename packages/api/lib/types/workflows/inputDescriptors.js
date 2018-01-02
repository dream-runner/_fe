'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'inputDescriptors';

var schema = exports.schema = new _normalizr.schema.Array(new _normalizr.schema.Entity(collection, {}, {
  idAttribute: 'key'
}));

var fetch = exports.fetch = function fetch(_ref) {
  var actionId = _ref.actionId,
      workflowId = _ref.workflowId;
  return (0, _callApi2.default)('workflows/' + workflowId + '/actions/' + actionId + '/inputs', schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/workflows/inputDescriptors.js