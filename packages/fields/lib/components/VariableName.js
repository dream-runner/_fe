'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _expressions = require('../expressions');

var _getFieldsContext = require('./getFieldsContext');

var _getFieldsContext2 = _interopRequireDefault(_getFieldsContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VariableName = function VariableName(_ref) {
  var dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables,
      expression = _ref.expression;

  var variable = (0, _expressions.getVariable)(variables, expression);

  if (!variable) {
    throw new Error('Could not resolve variable name for expression ' + expression);
  }

  if (!variable.name) {
    var label = (0, _expressions.resolveName)(dataTypeDescriptors, variables, expression);

    return _react2.default.createElement(
      _hints.Hint,
      { inline: true },
      label
    );
  }
  return _react2.default.createElement(
    'span',
    null,
    variable.name
  );
};

exports.default = (0, _getFieldsContext2.default)(VariableName);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/VariableName.js