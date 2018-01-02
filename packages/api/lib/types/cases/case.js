'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.update = exports.create = exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

var _users = require('../users');

var _task = require('./task');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'cases';

var schema = exports.schema = new _normalizr.schema.Entity(collection, {
  tasks: [_task.schema],
  creator: _users.USER.schema
});

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id;
  return (0, _callApi2.default)('cases/' + id, schema);
};

var create = exports.create = function create(_ref2) {
  var sourceWorkflowId = _ref2.sourceWorkflowId,
      fields = _ref2.fields;
  return (0, _callApi2.default)('cases', schema, {
    method: 'POST',
    body: {
      triggerInstance: {
        sourceWorkflowId: sourceWorkflowId,
        data: {
          formInstance: {
            value: { fields: fields }
          }
        }
      }
    }
  });
};

var update = exports.update = function update(_ref3, body) {
  var id = _ref3.id;
  return (0, _callApi2.default)('cases/' + id, schema, { method: 'PUT', body: body });
};

var remove = exports.remove = function remove(_ref4) {
  var id = _ref4.id,
      cascadeDelete = _ref4.cascadeDelete;
  return (0, _callApi2.default)('cases/' + id + '?cascade=' + cascadeDelete, schema, {
    method: 'DELETE'
  });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/case.js