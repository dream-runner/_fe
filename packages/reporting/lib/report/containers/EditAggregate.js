'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('../actions');

var _chart = require('../actions/chart');

var _chart2 = _interopRequireDefault(_chart);

var _EditAggregate = require('../components/EditAggregate');

var _EditAggregate2 = _interopRequireDefault(_EditAggregate);

var _reducers = require('../reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditAggregateContainer = function EditAggregateContainer(_ref) {
  var changeAggregation = _ref.changeAggregation,
      changeAggregateBinding = _ref.changeAggregateBinding,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['changeAggregation', 'changeAggregateBinding']);
  return _react2.default.createElement(_EditAggregate2.default, (0, _extends3.default)({}, rest, {
    onChangeBinding: changeAggregateBinding,
    onChangeAggregation: changeAggregation
  }));
};

exports.default = (0, _reactRedux.connect)(function (_ref2, _ref3) {
  var reporting = _ref2.reporting;
  var reportId = _ref3.reportId;
  return (0, _reducers.selectChartAggregateColumn)(reporting.reports, reportId);
}, function (dispatch, _ref4) {
  var reportId = _ref4.reportId;
  return (0, _redux.bindActionCreators)((0, _actions.bindReportId)(_chart2.default, reportId), dispatch);
})(EditAggregateContainer);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/containers/EditAggregate.js