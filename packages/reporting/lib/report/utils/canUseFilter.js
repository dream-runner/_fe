'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = canUseFilter;

var _lodash = require('lodash');

var _effektifFields = require('@signavio/effektif-fields');

var BINDABLE_TYPE_BLACKLIST = ['caseId', 'custom', 'oid', 'fileId'];
var VARIABLE_TYPE_BLACKLIST = ['fileId']; // exclude variable and its nested fields

function canUseFilter(bindable, dataTypeDescriptors, variables) {
  if (_effektifFields.bindingUtils.isNestedConnectorTypeDeeperThanOne(dataTypeDescriptors, variables, bindable)) {
    return false;
  }

  var variable = _effektifFields.expressionUtils.getVariable(variables, bindable.expression);

  var isBlackListedVariableListType = _effektifFields.dataTypeUtils.isList(variable.type) && (0, _lodash.includes)(VARIABLE_TYPE_BLACKLIST, variable.type.elementType.name);

  var isBlackListedVariableType = (0, _lodash.includes)(VARIABLE_TYPE_BLACKLIST, variable.type.name);

  if (isBlackListedVariableListType || isBlackListedVariableType) {
    return false;
  }

  var isConnectorType = variable.type.name === 'connectorReference';
  var isNestedField = _effektifFields.expressionUtils.isNested(bindable.expression);
  var rootConnectorType = isConnectorType && !isNestedField;

  if (rootConnectorType) {
    return true;
  }

  var bindableType = _effektifFields.expressionUtils.resolveType(dataTypeDescriptors, variables, bindable.expression);

  return !(0, _lodash.includes)(BINDABLE_TYPE_BLACKLIST, bindableType.name) && !isConnectorType;
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/utils/canUseFilter.js