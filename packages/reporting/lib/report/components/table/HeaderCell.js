'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveName = _effektifFields.expressionUtils.resolveName,
    getVariable = _effektifFields.expressionUtils.getVariable;


function HeaderCell(_ref) {
  var id = _ref.id,
      name = _ref.name,
      binding = _ref.binding,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables;
  var expression = binding.expression;

  return _react2.default.createElement(
    _fixedDataTable.Cell,
    null,
    _react2.default.createElement(
      'span',
      {
        style: { paddingLeft: _styles.padding.normal, paddingRight: _styles.padding.normal }
      },
      name || (getVariable(variables, expression) ? resolveName(dataTypeDescriptors, variables, expression) : _react2.default.createElement(
        _components.Empty,
        null,
        (0, _signavioI18n2.default)('Deleted field')
      ))
    )
  );
}

exports.default = (0, _effektifFields.getFieldsContext)(HeaderCell);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/table/HeaderCell.js