'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'connectorValues';
var schema = exports.schema = new _normalizr.schema.Entity(collection);

var fetch = exports.fetch = function fetch(_ref) {
  var connectorDataSourceId = _ref.connectorDataSourceId,
      id = _ref.id;
  return (0, _callApi2.default)('connectorTypes/' + connectorDataSourceId + '/' + id + '/actions/name', schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/fields/connectorDataSourceOption.js