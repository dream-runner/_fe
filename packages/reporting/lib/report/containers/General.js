'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _CaseFilters = require('./CaseFilters');

var _CaseFilters2 = _interopRequireDefault(_CaseFilters);

var _GroupBy = require('./GroupBy');

var _GroupBy2 = _interopRequireDefault(_GroupBy);

var _EditAggregate = require('./EditAggregate');

var _EditAggregate2 = _interopRequireDefault(_EditAggregate);

var _ResultForReportUnderEdit = require('./ResultForReportUnderEdit');

var _ResultForReportUnderEdit2 = _interopRequireDefault(_ResultForReportUnderEdit);

var _components2 = require('../components');

var _whereReducer = require('../reducers/whereReducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var General = function General(props) {
  var report = props.report,
      readOnly = props.readOnly;

  var selectedWorkflow = (0, _whereReducer.getSelectedWorkflow)(report.where);

  return _react2.default.createElement(
    _components2.ProvideFieldsContext,
    { from: report.from, workflowId: selectedWorkflow },
    _react2.default.createElement(
      'div',
      { className: 'view-content' },
      _react2.default.createElement(
        'div',
        { className: 'details' },
        _react2.default.createElement(_CaseFilters2.default, (0, _extends3.default)({
          reportId: report.id
        }, report.where, {
          readOnly: readOnly
        })),
        _react2.default.createElement(_components.Divider, { title: (0, _signavioI18n2.default)('Grouping') }),
        _react2.default.createElement(_GroupBy2.default, {
          reportId: report.id,
          groupBy: report.groupBy,
          readOnly: readOnly
        }),
        _react2.default.createElement(ChartOrHint, (0, _extends3.default)({}, props, { readOnly: readOnly })),
        _react2.default.createElement(_components.Divider, { title: (0, _signavioI18n2.default)('Results') }),
        !!selectedWorkflow && _react2.default.createElement(_components2.EditableTable, {
          reportId: report.id,
          selectionId: '1',
          readOnly: readOnly,
          columns: report.selections.find(function (_ref) {
            var id = _ref.id;
            return id === '1';
          }).columns
        })
      )
    )
  );
};

exports.default = (0, _effektifApi.withUser)(General);


var ChartOrHint = function ChartOrHint(_ref2) {
  var report = _ref2.report,
      readOnly = _ref2.readOnly;

  if (!(0, _whereReducer.getSelectedWorkflow)(report.where)) {
    return _react2.default.createElement(
      _components.Hint,
      null,
      (0, _signavioI18n2.default)('First, select a process')
    );
  }

  if (report.groupBy.length === 0) {
    return null;
    // return (
    //   <Hint>
    //     { i18n('If you select a field to group by, a chart will be plotted here') }
    //   </Hint>
    // )
  }

  return _react2.default.createElement(
    'div',
    { style: { marginTop: 1 } },
    _react2.default.createElement(_EditAggregate2.default, {
      reportId: report.id,
      groupBy: report.groupBy,
      readOnly: readOnly
    }),
    _react2.default.createElement(_ResultForReportUnderEdit2.default, {
      reportId: report.id,
      selectionId: '2',
      editable: !readOnly
    })
  );
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/containers/General.js