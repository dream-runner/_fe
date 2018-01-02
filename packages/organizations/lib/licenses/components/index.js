'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.License = undefined;

var _paywall = require('./paywall');

Object.keys(_paywall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _paywall[key];
    }
  });
});

var _License2 = require('./License');

var _License3 = _interopRequireDefault(_License2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.License = _License3.default;


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/components/index.js