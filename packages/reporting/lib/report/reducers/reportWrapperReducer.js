'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectChartAggregateColumn = exports.selectReport = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _redux = require('redux');

var _lodash = require('lodash');

var _shallowEqual = require('react-redux/lib/utils/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _reportReducer = require('./reportReducer');

var _reportReducer2 = _interopRequireDefault(_reportReducer);

var _report = require('../actions/report');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var determineResultsNeedingRefresh = function determineResultsNeedingRefresh(report, previousReport) {
  var allNeedRefresh = !previousReport || report.where !== previousReport.where || report.groupBy !== previousReport.groupBy;

  var selectionIds = report.selections.map(function (sel) {
    return sel.id;
  });

  if (allNeedRefresh) {
    return selectionIds;
  }

  return (0, _lodash.difference)(report.selections, previousReport.selections).map(function (selection) {
    return selection.id;
  });
};

var objectWithKeysAndValue = function objectWithKeysAndValue(objKeys, value) {
  return objKeys.reduce(function (acc, key) {
    return (0, _extends4.default)({}, acc, (0, _defineProperty3.default)({}, key, value));
  }, {});
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { meta: { revision: 0 } };
  var action = arguments[1];
  var type = action.type;
  var meta = state.meta,
      report = state.report;


  var newReport = (0, _reportReducer2.default)(report, action);

  var resultsNeedingRefresh = determineResultsNeedingRefresh(newReport, report);

  var revision = newReport !== report ? meta.revision + 1 : meta.revision;

  var pendingRevision = void 0;
  switch (type) {
    case _report.REPORT_SAVE:
      pendingRevision = revision;
      break;
    case _report.REPORT_SAVE_SUCCESS:
      pendingRevision = null;
      break;
    default:
      pendingRevision = meta.pendingRevision;
  }

  var newMeta = type === _report.REPORT_LOAD_SUCCESS ? {
    revision: 0,
    pendingRevision: null,
    committedRevision: 0,
    revisionsResultsDependOn: objectWithKeysAndValue(resultsNeedingRefresh, 0)
  } : {
    revision: revision,
    pendingRevision: pendingRevision,
    committedRevision: type === _report.REPORT_SAVE_SUCCESS ? meta.pendingRevision : meta.committedRevision,
    revisionsResultsDependOn: resultsNeedingRefresh.length === 0 ? meta.revisionsResultsDependOn : (0, _extends4.default)({}, meta.revisionsResultsDependOn, objectWithKeysAndValue(resultsNeedingRefresh, revision))
  };

  var newState = {
    report: newReport,
    meta: (0, _shallowEqual2.default)(newMeta, meta) ? meta : newMeta
  };

  return (0, _shallowEqual2.default)(newState, state) ? state : newState;
};

var selectReport = exports.selectReport = function selectReport(state) {
  return state.report;
};
var selectChartAggregateColumn = exports.selectChartAggregateColumn = (0, _redux.compose)(_reportReducer.selectChartAggregateColumn, selectReport);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/reducers/reportWrapperReducer.js