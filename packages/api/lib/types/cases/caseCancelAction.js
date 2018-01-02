'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.schema = exports.collection = undefined;

var _case = require('./case');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _case.collection;
  }
});

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = new _normalizr.schema.Array(_case.schema);

var create = exports.create = function create(_ref) {
  var id = _ref.id,
      body = _ref.body;
  return (0, _callApi2.default)('cases/' + id + '/cancel', schema, { method: 'POST', body: body });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/caseCancelAction.js