'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _connectorDataSourceOption = require('./connectorDataSourceOption');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _connectorDataSourceOption.collection;
  }
});

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = new _normalizr.schema.Array(_connectorDataSourceOption.schema);

var fetch = exports.fetch = function fetch(_ref) {
  var connectorDataSourceId = _ref.connectorDataSourceId,
      search = _ref.search;
  return (0, _callApi2.default)('connectorTypes/' + connectorDataSourceId + '/options?filter=' + (search || ''), schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/fields/connectorDataSourceOptions.js