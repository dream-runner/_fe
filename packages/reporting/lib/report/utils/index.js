'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWriteAccess = exports.unique = exports.reorder = exports.splice = exports.canUseFilter = undefined;

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _canUseFilter2 = require('./canUseFilter');

var _canUseFilter3 = _interopRequireDefault(_canUseFilter2);

var _splice2 = require('./splice');

var _splice3 = _interopRequireDefault(_splice2);

var _reorder2 = require('./reorder');

var _reorder3 = _interopRequireDefault(_reorder2);

var _unique2 = require('./unique');

var _unique3 = _interopRequireDefault(_unique2);

var _hasWriteAccess2 = require('./hasWriteAccess');

var _hasWriteAccess3 = _interopRequireDefault(_hasWriteAccess2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.canUseFilter = _canUseFilter3.default;
exports.splice = _splice3.default;
exports.reorder = _reorder3.default;
exports.unique = _unique3.default;
exports.hasWriteAccess = _hasWriteAccess3.default;


var isWorkflowCondition = function isWorkflowCondition(cond) {
  return cond.type === 'equals' && cond.left.expression === 'case.sourceWorkflowId';
};

var isCaseStateCondition = function isCaseStateCondition(cond) {
  return cond.left.expression === 'case.closed' && (cond.type === 'isTrue' || cond.type === 'isFalse');
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/utils/index.js