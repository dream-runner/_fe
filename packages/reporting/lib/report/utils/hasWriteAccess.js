"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hasWriteAccess = function hasWriteAccess(access, userId) {
  return access.edit.find(function (_ref) {
    var id = _ref.id;
    return id === userId;
  });
};

exports.default = hasWriteAccess;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/utils/hasWriteAccess.js