'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

var _case = require('./case');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'cancelCasesActions';
var schema = exports.schema = new _normalizr.schema.Entity(collection);

var create = exports.create = function create(_ref) {
  var selectedCaseIds = _ref.selectedCaseIds,
      reason = _ref.reason;
  return (0, _callApi2.default)('cases/cancel/multi', schema, {
    method: 'POST',
    body: { caseIds: selectedCaseIds, reason: reason }
  });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/casesCancelAction.js