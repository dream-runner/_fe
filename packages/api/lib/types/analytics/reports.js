'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cachePolicy = exports.fetch = exports.schema = exports.collection = undefined;

var _report = require('./report');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _report.collection;
  }
});

var _normalizr = require('normalizr');

var _kraken = require('@signavio/kraken');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = new _normalizr.schema.Array(_report.schema);

var fetch = exports.fetch = function fetch() {
  return (0, _callApi2.default)('reports', schema);
};

var cachePolicy = exports.cachePolicy = _kraken.cachePolicies.queryFromCache;


// WEBPACK FOOTER //
// ./packages/api/lib/types/analytics/reports.js