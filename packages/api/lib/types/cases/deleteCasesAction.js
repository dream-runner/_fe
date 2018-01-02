'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'deleteCasesActions';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var create = exports.create = function create(_ref) {
  var cascade = _ref.cascade,
      selectedCaseIds = _ref.selectedCaseIds;
  return (0, _callApi2.default)('cases/delete/multi', schema, {
    method: 'POST',
    body: { caseIds: selectedCaseIds, cascade: cascade }
  });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/deleteCasesAction.js