'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleList;

var _effektifFields = require('@signavio/effektif-fields');

function toggleList(variables, fieldDefinition) {
  var variable = _effektifFields.expressionUtils.getVariable(variables, fieldDefinition.binding.expression);

  if (_effektifFields.dataTypeUtils.isList(variable.type)) {
    return (0, _effektifFields.convertToElementType)(variable);
  }

  return (0, _effektifFields.convertToListType)(variable);
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/toggleList.js