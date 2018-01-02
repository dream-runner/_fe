'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _containers = require('./containers');

Object.keys(_containers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _containers[key];
    }
  });
});
exports.default = _containers.Main;


// WEBPACK FOOTER //
// ./packages/cases/lib/case/index.js