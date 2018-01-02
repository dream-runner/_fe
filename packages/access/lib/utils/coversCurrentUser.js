'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = coversCurrentUser;

var _lodash = require('lodash');

function coversCurrentUser(user, reference) {
  return user.id === reference.id || (0, _lodash.includes)(user.groupIds, reference.id) || reference.type === 'organization';
}


// WEBPACK FOOTER //
// ./packages/access/lib/utils/coversCurrentUser.js