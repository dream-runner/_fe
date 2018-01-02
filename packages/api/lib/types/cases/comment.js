'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.fetch = exports.schema = exports.collection = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'comments';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var fetch = exports.fetch = function fetch(_ref) {
  var caseId = _ref.caseId,
      id = _ref.id;
  return (0, _callApi2.default)('cases/' + caseId + '/events/' + id, schema);
};

var create = function create(_ref2) {
  var caseId = _ref2.caseId,
      parentId = _ref2.parentId,
      body = (0, _objectWithoutProperties3.default)(_ref2, ['caseId', 'parentId']);

  var url = 'cases/' + caseId + '/events';

  if (parentId) {
    url = url + '/' + parentId;
  }

  return (0, _callApi2.default)(url, schema, {
    method: 'POST',
    body: (0, _extends3.default)({
      caseId: caseId,
      parentId: parentId
    }, body)
  });
};
exports.create = create;


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/comment.js