'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getReadOnly;

var _lodash = require('lodash');

var _effektifFields = require('@signavio/effektif-fields');

function getReadOnly(fieldDefinition, readOnly, configuration, variables) {
  if (readOnly) {
    return true;
  }

  var disabled = configuration.disabled,
      target = configuration.target;

  if ((0, _lodash.isFunction)(disabled) && disabled(fieldDefinition)) {
    return true;
  }

  if (fieldDefinition.customRules && (0, _lodash.includes)(['readOnly', 'required'], configuration.configKey)) {
    return true;
  }

  var configurationTarget = (0, _lodash.isFunction)(target) ? target(fieldDefinition) : target;
  var variable = _effektifFields.expressionUtils.getVariable(variables, fieldDefinition.binding.expression);

  if (variable.nonConfigurable && configurationTarget !== 'fieldDefinition' && !(0, _lodash.includes)(['description', 'name'], configuration.configKey)) {
    return true;
  }

  return _effektifFields.expressionUtils.isNested(fieldDefinition.binding.expression) && configurationTarget !== 'fieldDefinition';
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/getReadOnly.js