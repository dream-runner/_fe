'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'fields';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var update = exports.update = function update(_ref, body) {
  var taskId = _ref.taskId,
      id = _ref.id;
  return (0, _callApi2.default)('tasks/' + taskId + '/form/fields/' + id, schema, { method: 'PUT', body: body });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/field.js