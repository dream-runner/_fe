'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _Binding = require('./Binding');

var _Binding2 = _interopRequireDefault(_Binding);

var _expressions = require('../../expressions');

var _getFieldsContext = require('../getFieldsContext');

var _getFieldsContext2 = _interopRequireDefault(_getFieldsContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.compose)(_getFieldsContext2.default, (0, _recompose.withProps)(function (_ref) {
  var label = _ref.label,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables,
      type = _ref.type;

  if (label) {
    return { label: label };
  }
  return {
    label: _react2.default.createElement(
      _hints.Hint,
      { inline: true },
      (0, _expressions.defaultNameForType)(dataTypeDescriptors, variables, type)
    )
  };
}), _components.withLabel)(_Binding2.default);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/LabeledBinding.js