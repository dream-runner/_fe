'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'feedback';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var create = exports.create = function create(body) {
  return (0, _callApi2.default)('feedback', schema, { method: 'POST', body: body });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/main/feedback.js