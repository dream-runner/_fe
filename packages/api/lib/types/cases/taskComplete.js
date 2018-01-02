'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.schema = exports.collection = undefined;

var _task = require('./task');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _task.collection;
  }
});

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = _task.schema;

var create = exports.create = function create(_ref) {
  var id = _ref.id,
      body = _ref.body;
  return (0, _callApi2.default)('tasks/' + id + '/complete', schema, { method: 'POST', body: body });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/taskComplete.js