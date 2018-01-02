'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectChartAggregateColumn = exports.selectSelections = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require('redux');

var _reduceReducers = require('reduce-reducers');

var _reduceReducers2 = _interopRequireDefault(_reduceReducers);

var _whereReducer = require('./whereReducer');

var _whereReducer2 = _interopRequireDefault(_whereReducer);

var _groupByReducer = require('./groupByReducer');

var _groupByReducer2 = _interopRequireDefault(_groupByReducer);

var _accessReducer = require('./accessReducer');

var _accessReducer2 = _interopRequireDefault(_accessReducer);

var _selectionsReducer = require('./selectionsReducer');

var _selectionsReducer2 = _interopRequireDefault(_selectionsReducer);

var _report = require('../actions/report');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identity() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return state;
}

var combinedReportReducer = (0, _redux.combineReducers)({
  id: identity,
  name: identity,
  from: identity,
  where: _whereReducer2.default,
  selections: _selectionsReducer2.default,
  groupBy: _groupByReducer2.default,
  access: _accessReducer2.default,

  creatorId: identity,
  created: identity,
  organizationId: identity
  // lastUpdated: identity,
});

var initialReport = combinedReportReducer(undefined, {
  type: '@@REPORTING/INIT'
});

function generalReportReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _report.REPORT_LOAD_SUCCESS:
      return (0, _extends3.default)({}, initialReport, payload.report);
    case _report.REPORT_CHANGE:
      // generic change action
      return (0, _extends3.default)({}, state, payload.changes);
    default:
      return state;
  }
}

exports.default = (0, _reduceReducers2.default)(combinedReportReducer, generalReportReducer);
var selectSelections = exports.selectSelections = function selectSelections(state) {
  return state.selections;
};
var selectChartAggregateColumn = exports.selectChartAggregateColumn = (0, _redux.compose)(_selectionsReducer.selectChartAggregateColumn, selectSelections);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/reducers/reportReducer.js