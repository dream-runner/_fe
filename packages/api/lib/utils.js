'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prependOrg = undefined;

var _callApi = require('./callApi');

var prependOrg = exports.prependOrg = function prependOrg(path) {
  return '/' + (0, _callApi.getCurrentOrgKey)() + path;
};
