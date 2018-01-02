'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectAggregateColumn = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = chartColumnsReducer;

var _utils = require('../utils');

var _chart = require('../actions/chart');

var _groupBy = require('../actions/groupBy');

var _caseFilters = require('../actions/caseFilters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultAggregateColumn = {
  id: 'defAgg',
  aggregation: 'count',
  binding: { expression: 'case' }
};

function chartColumnsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [defaultAggregateColumn];
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _groupBy.GROUP_BY_ADD:
      return [].concat((0, _toConsumableArray3.default)(state.slice(0, -1)), [// all but the aggregate
      { id: (0, _utils.unique)(state, 'id'), binding: payload.binding }], (0, _toConsumableArray3.default)(state.slice(-1)));
    case _groupBy.GROUP_BY_REORDER:
      // keep aggregate column at the end
      return (0, _utils.reorder)(state, [].concat((0, _toConsumableArray3.default)(payload.indices), [state.length - 1]));
    case _groupBy.GROUP_BY_REMOVE:
      // as the aggregate is always at the end, the indices for grouping will match
      return (0, _utils.splice)(state, payload.index, 1);
    case _chart.CHART_CHANGE_AGGREGATION:
      return [].concat((0, _toConsumableArray3.default)(state.slice(0, -1)), [(0, _extends3.default)({}, state[state.length - 1], {
        aggregation: payload.aggregation
      })]);
    case _chart.CHART_CHANGE_AGGREGATE_BINDING:
      return [].concat((0, _toConsumableArray3.default)(state.slice(0, -1)), [(0, _extends3.default)({}, state[state.length - 1], { binding: payload.binding })]);
    case _caseFilters.CONDITION_CHANGE_WORKFLOW_SELECTION:
      return state.filter(function (_ref2) {
        var binding = _ref2.binding;
        return binding.expression.split('.')[0] === 'case';
      } // only keep case expressions
      );
    default:
      return state;
  }
}

var selectAggregateColumn = exports.selectAggregateColumn = function selectAggregateColumn(_ref3) {
  var columns = _ref3.columns;
  return columns[columns.length - 1];
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/reducers/chartReducer.js