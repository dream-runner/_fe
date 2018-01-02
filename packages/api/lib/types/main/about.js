'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var collection = exports.collection = 'about';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var fetch = exports.fetch = function fetch() {
  return (0, _callApi.callAdminApi)('about', schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/main/about.js