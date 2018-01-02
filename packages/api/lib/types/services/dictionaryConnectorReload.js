'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.schema = exports.collection = undefined;

var _dictionaryConnector = require('./dictionaryConnector');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _dictionaryConnector.collection;
  }
});
Object.defineProperty(exports, 'schema', {
  enumerable: true,
  get: function get() {
    return _dictionaryConnector.schema;
  }
});

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = exports.create = function create(_ref) {
  var connectorId = _ref.connectorId;
  return (0, _callApi2.default)('dictionary/connectors/' + connectorId + '/actions/reload', _dictionaryConnector.schema, {
    method: 'POST'
  });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/services/dictionaryConnectorReload.js