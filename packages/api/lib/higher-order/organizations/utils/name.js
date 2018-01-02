'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = name;

var _lodash = require('lodash');

function name(user) {
  return (0, _lodash.compact)([user.firstName, user.lastName]).join(' ');
}


// WEBPACK FOOTER //
// ./packages/api/lib/higher-order/organizations/utils/name.js