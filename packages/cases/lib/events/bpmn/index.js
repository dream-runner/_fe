'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _events = require('./events');

Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _events[key];
    }
  });
});

var _gateways = require('./gateways');

Object.keys(_gateways).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gateways[key];
    }
  });
});

var _subprocess = require('./subprocess');

Object.keys(_subprocess).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _subprocess[key];
    }
  });
});

var _task = require('./task');

Object.keys(_task).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _task[key];
    }
  });
});

var events = _interopRequireWildcard(_events);

var gateways = _interopRequireWildcard(_gateways);

var subprocess = _interopRequireWildcard(_subprocess);

var task = _interopRequireWildcard(_task);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _extends3.default)({}, events, gateways, subprocess, task);


// WEBPACK FOOTER //
// ./packages/cases/lib/events/bpmn/index.js