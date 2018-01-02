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

var _workflows = require('../workflows');

var _users = require('../users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'results';

var schema = exports.schema = new _normalizr.schema.Entity(collection, {
  workflows: new _normalizr.schema.Array(_workflows.WORKFLOW.schema),
  users: new _normalizr.schema.Array(_users.USER.schema)
}, {
  idAttribute: (0, _compositeId2.default)('reportId', 'selectionId')
});

var fetch = exports.fetch = function fetch(_ref) {
  var reportId = _ref.reportId,
      selectionId = _ref.selectionId;
  return (0, _callApi2.default)('reports/' + reportId + '/results/' + selectionId, schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/analytics/result.js