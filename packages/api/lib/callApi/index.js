'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getCurrentLoginToken = getCurrentLoginToken;
exports.getCurrentOrgKey = getCurrentOrgKey;
exports.getBaseUrl = getBaseUrl;
exports.toQueryString = toQueryString;
exports.default = callOrganizationApi;
exports.callAdminApi = callAdminApi;

var _kraken = require('@signavio/kraken');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API_BASE = '/api/v1';

function getCurrentLoginToken() {
  try {
    return require('singleton/Login').token();
  } catch (error) {
    return null;
  }
}

function getCurrentOrgKey() {
  try {
    var org = require('singleton/Login').getActiveOrganization();
    return org && org.key;
  } catch (error) {
    return null;
  }
}

function getBaseUrl(organization) {
  var orgKey = organization ? organization.key : getCurrentOrgKey();
  var suffix = orgKey ? orgKey + '/' : '';
  return API_BASE + '/' + suffix;
}

function toQueryString(paramsObject) {
  return Object.keys(paramsObject).filter(function (key) {
    return paramsObject[key] !== undefined;
  }).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(paramsObject[key]);
  }).join('&');
}

function callApi(url, schema) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return (0, _kraken.callApi)(url, schema, (0, _extends3.default)({}, options, {
    body: options.body && JSON.stringify(options.body),
    headers: (0, _extends3.default)({
      credentials: 'same-origin',
      Authorization: getCurrentLoginToken()
    }, options.headers)
  }));
}

function callOrganizationApi(url, schema, options) {
  return callApi(function () {
    return getBaseUrl() + url;
  }, // resolve lazily to make sure we're getting the latest org key
  schema, options);
}

function callAdminApi(url, schema, options) {
  return callApi(API_BASE + '/' + url, schema, options);
}


// WEBPACK FOOTER //
// ./packages/api/lib/callApi/index.js