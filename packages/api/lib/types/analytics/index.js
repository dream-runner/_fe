'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RESULT = exports.REPORTS = exports.REPORT = undefined;

var _report = require('./report');

var _REPORT = _interopRequireWildcard(_report);

var _reports = require('./reports');

var _REPORTS = _interopRequireWildcard(_reports);

var _result = require('./result');

var _RESULT = _interopRequireWildcard(_result);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.REPORT = _REPORT;
exports.REPORTS = _REPORTS;
exports.RESULT = _RESULT;


// WEBPACK FOOTER //
// ./packages/api/lib/types/analytics/index.js