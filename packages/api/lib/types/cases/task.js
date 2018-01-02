'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.fetch = exports.create = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

var _users = require('../users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'tasks';
var schema = exports.schema = new _normalizr.schema.Entity(collection);

schema.define({
  parent: schema,
  subtasks: [schema],
  assigneeGroup: _users.GROUP.schema,
  assignee: _users.USER.schema
});

var create = exports.create = function create(body) {
  return (0, _callApi2.default)('tasks', schema, { method: 'POST', body: body });
};

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id;
  return (0, _callApi2.default)('tasks/' + id, schema);
};

var update = exports.update = function update(_ref2, body) {
  var id = _ref2.id;
  return (0, _callApi2.default)('tasks/' + id, schema, { method: 'PUT', body: body });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/task.js