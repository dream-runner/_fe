'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveDescriptor;

var _effektifFields = require('@signavio/effektif-fields');

function resolveDescriptor(fieldDefinition, dataTypeDescriptors, variables) {
  var expression = fieldDefinition.binding.expression;

  var resolvedType = _effektifFields.expressionUtils.resolveType(dataTypeDescriptors, variables, expression);
  return _effektifFields.dataTypeUtils.getDescriptor(dataTypeDescriptors, _effektifFields.dataTypeUtils.isList(resolvedType) ? resolvedType.elementType : resolvedType);
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/resolveDescriptor.js