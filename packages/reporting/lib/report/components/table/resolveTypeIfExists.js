'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveTypeIfExists;

var _effektifFields = require('@signavio/effektif-fields');

function resolveTypeIfExists(dataTypeDescriptors, variables, expression) {
  var variable = _effektifFields.expressionUtils.getVariable(variables, expression);
  if (!variable) {
    return null;
  }

  var fieldType = _effektifFields.expressionUtils.resolveType(dataTypeDescriptors, variables, expression);

  var parent = _effektifFields.bindingUtils.getParent({ expression: expression });
  if (!parent) {
    return fieldType;
  }

  var parentType = _effektifFields.expressionUtils.resolveType(dataTypeDescriptors, variables, parent.expression);

  if (_effektifFields.dataTypeUtils.isList(parentType)) {
    return (0, _effektifFields.listType)(fieldType);
  }

  return fieldType;
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/table/resolveTypeIfExists.js