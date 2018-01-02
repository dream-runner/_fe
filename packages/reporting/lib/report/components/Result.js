'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = Result;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

var _pieChart = require('./pieChart');

var _pieChart2 = _interopRequireDefault(_pieChart);

var _barChart = require('./barChart');

var _barChart2 = _interopRequireDefault(_barChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Result(_ref) {
  var report = _ref.report,
      selectionId = _ref.selectionId,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['report', 'selectionId']);

  var selection = (0, _lodash.find)(report.selections, { id: selectionId });
  (0, _invariant2.default)(!!selection, 'Report ' + report.id + ' does not have a selection with id \'' + selectionId + '\'');

  switch (selection.widget) {
    case 'table':
      return _react2.default.createElement(_table2.default, (0, _extends3.default)({
        columns: selection.columns,
        groupBy: report.groupBy,
        selectionId: selectionId
      }, rest));

    case 'pieChart':
      return _react2.default.createElement(_pieChart2.default, (0, _extends3.default)({ columns: selection.columns }, rest));

    case 'barChart':
      return _react2.default.createElement(_barChart2.default, (0, _extends3.default)({ columns: selection.columns }, rest));

    default:
      return null;
  }
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/Result.js