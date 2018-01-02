'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectChartAggregateColumn = exports.selectReport = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _redux = require('redux');

var _reducerUtils = require('../../utils/reducerUtils');

var _reportWrapperReducer = require('./reportWrapperReducer');

var _reportWrapperReducer2 = _interopRequireDefault(_reportWrapperReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reducerUtils.selectPropertyReduce)(function (state, _ref) {
  var payload = _ref.payload;
  return payload && payload.reportId;
}, function (state, _ref2) {
  var _ref2$payload = _ref2.payload,
      reportId = _ref2$payload.reportId,
      payloadRest = (0, _objectWithoutProperties3.default)(_ref2$payload, ['reportId']),
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['payload']);
  return (0, _reportWrapperReducer2.default)(state, (0, _extends3.default)({ payload: payloadRest }, rest));
});
var selectReport = exports.selectReport = function selectReport(state, reportId) {
  return state[reportId];
};
var selectChartAggregateColumn = exports.selectChartAggregateColumn = (0, _redux.compose)(_reportWrapperReducer.selectChartAggregateColumn, selectReport);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/reducers/index.js