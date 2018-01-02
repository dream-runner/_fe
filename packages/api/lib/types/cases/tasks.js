'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _task = require('./task');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _task.collection;
  }
});

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = new _normalizr.schema.Array(_task.schema);

var fetch = exports.fetch = function fetch(_ref) {
  var caseId = _ref.caseId;
  return (0, _callApi2.default)('cases/' + caseId + '/tasks', schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/tasks.js