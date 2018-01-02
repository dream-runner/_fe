'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports._cookies = _cookies;
exports.get = get;
exports.remove = remove;

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_PATH = '/';

function set(name, value, expiration, path) {
  value = String(value);

  if (expiration) {
    value += '; expires=' + expiration.toUTCString();
  }
  if (path !== false) {
    value += '; path=' + (path || DEFAULT_PATH);
  }

  document.cookie = name + '=' + value;

  return get(name) === value;
}

function _cookies() {
  if (!document.cookie) {
    return {};
  }

  var cookies = {};

  (0, _each2.default)(document.cookie.split('; '), function (cookie) {
    var index = cookie.indexOf('=');

    var key = cookie.slice(0, index);
    var value = cookie.slice(index + 1);

    cookies[key] = value;
  });

  return cookies;
}

function get(name) {
  return _cookies()[name];
}

function remove(name) {
  set(name, '', new Date(0));

  return !get(name);
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/Cookies.js