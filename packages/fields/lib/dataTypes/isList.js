'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isList = function isList(type) {
  if (!type) {
    return false;
  }

  return type.name === 'list';
};

exports.default = isList;


// WEBPACK FOOTER //
// ./packages/fields/lib/dataTypes/isList.js