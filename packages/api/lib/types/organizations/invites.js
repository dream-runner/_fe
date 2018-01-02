'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.collection = undefined;

var _invite = require('./invite');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _invite.collection;
  }
});

var _normalizr = require('normalizr');

var schema = exports.schema = new _normalizr.schema.Array(_invite.schema);


// WEBPACK FOOTER //
// ./packages/api/lib/types/organizations/invites.js