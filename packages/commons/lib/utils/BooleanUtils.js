"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xor = xor;
function xor(a, b) {
  return !a && b || a && !b;
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/BooleanUtils.js