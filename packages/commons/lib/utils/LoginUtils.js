'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentPath = currentPath;
exports.makeUrl = makeUrl;
exports.adminUrl = adminUrl;

var _backboneRelPartialput = require('backbone-rel-partialput');

var _backboneRelPartialput2 = _interopRequireDefault(_backboneRelPartialput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL_BASE = '/api/v1';

function currentPath() {
  if (_backboneRelPartialput2.default.history.started && _backboneRelPartialput2.default.history.fragment) {
    // try to use the backbone history
    return _backboneRelPartialput2.default.history.fragment;
  }

  if (window.location.pathname !== '/') {
    return window.location.pathname + window.location.search + window.location.hash;
  }

  if (window.location.hash) {
    // for browsers without support for HTML5 push state
    return window.location.hash.replace('#', '');
  }

  // default value
  return '/';
}

function makeUrl(suffix, organization) {
  if (!organization) {
    return URL_BASE + '/' + suffix;
  }

  return URL_BASE + '/' + organization.key + '/' + suffix;
}

function adminUrl(suffix) {
  return makeUrl('admin/' + suffix);
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/LoginUtils.js