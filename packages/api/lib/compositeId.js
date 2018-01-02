'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = function () {
  for (var _len = arguments.length, attrs = Array(_len), _key = 0; _key < _len; _key++) {
    attrs[_key] = arguments[_key];
  }

  return function compositeId(entity) {
    return (0, _lodash.values)((0, _lodash.pick)(entity, attrs)).join('_');
  };
};


// WEBPACK FOOTER //
// ./packages/api/lib/compositeId.js