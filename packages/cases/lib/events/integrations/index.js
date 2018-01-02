'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.milestoneProcessEvent = exports.transformToDocumentEvent = exports.serviceNotConfigured = exports.js = exports.email = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _box = require('./box');

Object.keys(_box).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _box[key];
    }
  });
});

var _dmn = require('./dmn');

Object.keys(_dmn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dmn[key];
    }
  });
});

var _google = require('./google');

Object.keys(_google).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _google[key];
    }
  });
});

var box = _interopRequireWildcard(_box);

var dmn = _interopRequireWildcard(_dmn);

var google = _interopRequireWildcard(_google);

var _Email = require('./Email');

var _Email2 = _interopRequireDefault(_Email);

var _JavaScript = require('./JavaScript');

var _JavaScript2 = _interopRequireDefault(_JavaScript);

var _ServiceNotConfigured = require('./ServiceNotConfigured');

var _ServiceNotConfigured2 = _interopRequireDefault(_ServiceNotConfigured);

var _DocumentAdd = require('./DocumentAdd');

var _DocumentAdd2 = _interopRequireDefault(_DocumentAdd);

var _Milestone = require('./Milestone');

var _Milestone2 = _interopRequireDefault(_Milestone);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.email = _Email2.default;
exports.js = _JavaScript2.default;
exports.serviceNotConfigured = _ServiceNotConfigured2.default;
exports.transformToDocumentEvent = _DocumentAdd2.default;
exports.milestoneProcessEvent = _Milestone2.default;
exports.default = (0, _extends3.default)({}, box, dmn, google, {

  email: _Email2.default,
  js: _JavaScript2.default,
  serviceNotConfigured: _ServiceNotConfigured2.default,
  transformToDocumentEvent: _DocumentAdd2.default,
  milestoneProcessEvent: _Milestone2.default
});


// WEBPACK FOOTER //
// ./packages/cases/lib/events/integrations/index.js