'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = provideId;

var _utils = require('@signavio/effektif-commons/lib/utils');

function provideId() {
  var secondsSinceUnixEpoch = Math.floor(new Date().getTime() / 1000);

  return secondsSinceUnixEpoch.toString(36) + _utils.StringUtils.randomString();
}


// WEBPACK FOOTER //
// ./packages/workflows-app/lib/variables/utils/provideId.js