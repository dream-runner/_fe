'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHART_CHANGE_AGGREGATION = exports.CHART_CHANGE_AGGREGATION = 'CHART_CHANGE_AGGREGATION';
var CHART_CHANGE_AGGREGATE_BINDING = exports.CHART_CHANGE_AGGREGATE_BINDING = 'CHART_CHANGE_AGGREGATE_BINDING';

exports.default = {
  changeAggregation: function changeAggregation(aggregation) {
    return {
      type: CHART_CHANGE_AGGREGATION,
      payload: {
        aggregation: aggregation
      }
    };
  },
  changeAggregateBinding: function changeAggregateBinding(binding) {
    return {
      type: CHART_CHANGE_AGGREGATE_BINDING,
      payload: {
        binding: binding
      }
    };
  }
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/actions/chart.js