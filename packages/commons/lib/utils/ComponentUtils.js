"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.className = className;
function className(_ref, title) {
  var className = _ref.className;

  if (!className) {
    return;
  }

  return className + "-" + title;
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/ComponentUtils.js