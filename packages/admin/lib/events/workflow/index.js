'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effektifStopped = exports.effektifStarted = undefined;

var _Started = require('./Started');

var _Started2 = _interopRequireDefault(_Started);

var _Stopped = require('./Stopped');

var _Stopped2 = _interopRequireDefault(_Stopped);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.effektifStarted = _Started2.default;
exports.effektifStopped = _Stopped2.default;
exports.default = {
  effektifStopped: _Stopped2.default,
  effektifStarted: _Started2.default
};


// WEBPACK FOOTER //
// ./packages/admin/lib/events/workflow/index.js