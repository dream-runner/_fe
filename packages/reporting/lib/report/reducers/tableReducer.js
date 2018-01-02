'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = tableColumnsReducer;

var _lodash = require('lodash');

var _utils = require('../utils');

var _table = require('../actions/table');

var _groupBy = require('../actions/groupBy');

var _caseFilters = require('../actions/caseFilters');

var _report = require('../actions/report');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTableColumnExpressions = ['case.name'];

// const isDefaultTableColumn = column => (
//   defaultTableColumnExpressions.indexOf(column.expression) >= 0
// )

var initDefaultColumns = function initDefaultColumns(columns) {
  var caseColumns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return [].concat((0, _toConsumableArray3.default)(columns.length > 0 ? columns : defaultTableColumnExpressions.map(function (expression) {
    return {
      id: (0, _utils.unique)(columns, 'id'),
      binding: { expression: expression }
    };
  })), (0, _toConsumableArray3.default)((0, _lodash.take)(caseColumns, 5).map(function (column) {
    return (0, _extends3.default)({}, column, {
      id: (0, _utils.unique)(columns, 'id')
    });
  })));
};

function tableColumnsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _table.TABLE_ADD_COLUMN:
      return [].concat((0, _toConsumableArray3.default)(state), [(0, _extends3.default)({}, payload.column, {
        id: (0, _utils.unique)(state, 'id')
      })]);
    case _groupBy.GROUP_BY_ADD:
      return [
      // add grouping column to the left of the table
      { id: (0, _utils.unique)(state, 'id'), binding: payload.binding }].concat((0, _toConsumableArray3.default)(state.filter(function (column) {
        return !_effektifFields.bindingUtils.equals(column.binding, payload.binding);
      })));
    case _table.TABLE_REMOVE_COLUMN:
      return (0, _utils.splice)(state, payload.index, 1);
    case _table.TABLE_REPLACE_COLUMN:
      return (0, _utils.splice)(state, payload.index, 1, payload.column);
    case _table.TABLE_REORDER_COLUMNS:
      return (0, _utils.reorder)(state, payload.indices);
    case _caseFilters.CONDITION_CHANGE_WORKFLOW_SELECTION:
      return state.filter(function (_ref2) {
        var binding = _ref2.binding;
        return binding.expression.split('.')[0] === 'case';
      } // only keep case expressions
      );
    case _report.REPORT_INIT_DEFAULTS_FOR_WORKFLOW:
      return initDefaultColumns(state, payload.workflow.caseColumns);
    default:
      return state;
  }
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/reducers/tableReducer.js