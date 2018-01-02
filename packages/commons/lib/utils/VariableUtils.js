'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provideId = provideId;

var _StringUtils = require('./StringUtils');

function provideId() {
  var secondsSinceUnixEpoch = Math.floor(new Date().getTime() / 1000);

  return secondsSinceUnixEpoch.toString(36) + (0, _StringUtils.randomString)();
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/VariableUtils.js