'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'caseEvents';

var schema = exports.schema = new _normalizr.schema.Array(new _normalizr.schema.Entity(collection));

var fetch = exports.fetch = function fetch(_ref) {
  var caseId = _ref.caseId,
      filter = _ref.filter;

  var url = 'cases/' + caseId + '/events';

  if (filter) {
    var type = filter.type,
        taskId = filter.taskId;


    if (type) {
      url = url + '?type=' + type;
    } else {
      url = url + '?taskId=' + taskId;
    }
  }

  return (0, _callApi2.default)(url, schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/caseEvents.js