'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectChartAggregateColumn = exports.selectChart = exports.selectTable = undefined;

var _redux = require('redux');

var _reducerUtils = require('../../utils/reducerUtils');

var _tableReducer = require('./tableReducer');

var _tableReducer2 = _interopRequireDefault(_tableReducer);

var _chartReducer = require('./chartReducer');

var _chartReducer2 = _interopRequireDefault(_chartReducer);

var _chart = require('../actions/chart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reducerUtils.combineReducersArray)([(0, _redux.combineReducers)({
  id: function id() {
    return '1';
  },
  widget: function widget() {
    return 'table';
  },
  columns: _tableReducer2.default
}), (0, _redux.combineReducers)({
  id: function id() {
    return '2';
  },
  widget: function widget() {
    var currentWidget = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pieChart';
    var action = arguments[1];

    if (action.type === _chart.CHART_CHANGE_AGGREGATION) {
      if (action.payload.aggregation === 'count') {
        return 'pieChart';
      }

      return 'barChart';
    }

    return currentWidget;
  },
  columns: _chartReducer2.default
})]);
var selectTable = exports.selectTable = function selectTable(state) {
  return state[0];
};
var selectChart = exports.selectChart = function selectChart(state) {
  return state[1];
};
var selectChartAggregateColumn = exports.selectChartAggregateColumn = (0, _redux.compose)(_chartReducer.selectAggregateColumn, selectChart);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/reducers/selectionsReducer.js