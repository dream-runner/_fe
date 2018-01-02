'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _workflow = require('./workflow');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _workflow.collection;
  }
});

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = new _normalizr.schema.Array(_workflow.schema);

var fetch = exports.fetch = function fetch() {
  return (0, _callApi2.default)('workflows', schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/workflows/workflows.js