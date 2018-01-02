'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cachePolicy = exports.fetch = exports.schema = exports.collection = undefined;

var _label = require('./label');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _label.collection;
  }
});

var _normalizr = require('normalizr');

var _kraken = require('@signavio/kraken');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = new _normalizr.schema.Array(_label.schema);

var fetch = exports.fetch = function fetch() {
  return (0, _callApi2.default)('labels', schema);
};

var cachePolicy = exports.cachePolicy = _kraken.cachePolicies.queryFromCache;


// WEBPACK FOOTER //
// ./packages/api/lib/types/organizations/labels.js