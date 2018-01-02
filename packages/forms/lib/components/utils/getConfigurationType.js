'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getConfigurationType;

var _lodash = require('lodash');

var _effektifFields = require('@signavio/effektif-fields');

function getConfigurationType(fieldDefinition, configuration, dataTypeDescriptors, variables) {
  var type = configuration.type;


  if ((0, _lodash.isFunction)(type)) {
    return type(dataTypeDescriptors, variables, fieldDefinition);
  }

  if (!type) {
    var expression = fieldDefinition.binding.expression;

    return _effektifFields.expressionUtils.resolveType(dataTypeDescriptors, variables, expression);
  }

  return type;
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/getConfigurationType.js