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

var _grid = require('@signavio/effektif-commons/lib/components/grid');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifFields = require('@signavio/effektif-fields');

var _whereReducer = require('../reducers/whereReducer');

var _CustomCondition = require('./CustomCondition');

var _CustomCondition2 = _interopRequireDefault(_CustomCondition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CaseFilters = function CaseFilters(_ref) {
  var _ref$conditions = _ref.conditions,
      conditions = _ref$conditions === undefined ? [] : _ref$conditions,
      onChangeType = _ref.onChangeType,
      onReplace = _ref.onReplace,
      onRemove = _ref.onRemove,
      onAdd = _ref.onAdd,
      onChangeWorkflowSelection = _ref.onChangeWorkflowSelection,
      onChangeCaseStateSelection = _ref.onChangeCaseStateSelection,
      readOnly = _ref.readOnly;
  return _react2.default.createElement(
    'div',
    { className: 'filters' },
    _react2.default.createElement(
      _grid.Row,
      null,
      _react2.default.createElement(
        _grid.Col,
        { md: 2 },
        _react2.default.createElement(
          'h5',
          {
            style: {
              textAlign: 'right',
              lineHeight: _styles.variables.lineHeight.block + 'px'
            }
          },
          (0, _signavioI18n2.default)('Process')
        )
      ),
      _react2.default.createElement(
        _grid.Col,
        { md: 10 },
        _react2.default.createElement(_effektifFields.Field, {
          readOnly: readOnly,
          type: { name: 'workflowId' },
          refresh: true,
          fetchOnMount: true,
          noClear: true,
          value: (0, _whereReducer.getSelectedWorkflow)({ conditions: conditions }),
          placeholder: (0, _signavioI18n2.default)('Select a process'),
          onChange: onChangeWorkflowSelection,
          disableItem: function disableItem(_ref2) {
            var access = _ref2.access,
                published = _ref2.published;

            if (!published) {
              return (0, _signavioI18n2.default)('Not published yet');
            }
            if (access && !access.createReports) {
              return (0, _signavioI18n2.default)('You have no right to create reports');
            }
          }
        })
      )
    ),
    _react2.default.createElement(
      _grid.Row,
      null,
      _react2.default.createElement(
        _grid.Col,
        { md: 2 },
        _react2.default.createElement(
          'h5',
          {
            style: {
              textAlign: 'right',
              lineHeight: _styles.variables.lineHeight.block + 'px'
            }
          },
          (0, _signavioI18n2.default)('Case status')
        )
      ),
      _react2.default.createElement(
        _grid.Col,
        { md: 10 },
        _react2.default.createElement(CaseStateSelect, {
          value: (0, _whereReducer.getSelectedCaseState)({ conditions: conditions }),
          onChange: onChangeCaseStateSelection,
          readOnly: readOnly
        })
      )
    ),
    _react2.default.createElement(_components.Divider, { title: (0, _signavioI18n2.default)('Filters') }),
    _react2.default.createElement(_CustomCondition2.default, (0, _extends3.default)({}, (0, _whereReducer.getCustomCondition)({ conditions: conditions }), { onChangeType: onChangeType, onAdd: onAdd, onRemove: onRemove, onReplace: onReplace, readOnly: readOnly }))
  );
};

exports.default = CaseFilters;


var ALL = 'ALL';
var OPEN = 'OPEN';
var CLOSED = 'CLOSED';

var CaseStateSelect = function CaseStateSelect(props) {
  return _react2.default.createElement(
    _forms.DropdownSelect,
    (0, _extends3.default)({ placeholder: (0, _signavioI18n2.default)('all cases') }, props),
    _react2.default.createElement(_forms.Option, { value: ALL, name: (0, _signavioI18n2.default)('all cases') }),
    _react2.default.createElement(_forms.Option, { value: OPEN, name: (0, _signavioI18n2.default)('open cases') }),
    _react2.default.createElement(_forms.Option, { value: CLOSED, name: (0, _signavioI18n2.default)('closed cases') })
  );
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/CaseFilters.js