'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolvePreview;

var _effektifFields = require('@signavio/effektif-fields');

function resolvePreview(fieldDefinition, dataTypeDescriptors, variables) {
  var expression = fieldDefinition.binding.expression;

  var isBoundToNested = _effektifFields.expressionUtils.isNested(expression);
  var variable = _effektifFields.expressionUtils.getVariable(variables, expression);
  var resolvedName = fieldDefinition.name || _effektifFields.expressionUtils.resolveName(dataTypeDescriptors, variables, expression);

  return {
    asButtons: fieldDefinition.asButtons,
    type: _effektifFields.expressionUtils.resolveType(dataTypeDescriptors, variables, expression),
    label: resolvedName,
    hasDefaultLabel: !fieldDefinition.name && !variable.name,
    value: !isBoundToNested ? variable.defaultValue : null,
    description: isBoundToNested ? fieldDefinition.description : variable.description,
    readOnly: !!(fieldDefinition.readOnly || isBoundToNested),
    required: fieldDefinition.required
  };
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/resolvePreview.js