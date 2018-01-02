'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getConfigurationValue;

var _lodash = require('lodash');

var _effektifFields = require('@signavio/effektif-fields');

function getConfigurationValue(fieldDefinition, configuration, variables) {
  var configKey = configuration.configKey,
      regularBoolean = configuration.regularBoolean,
      target = configuration.target,
      transform = configuration.transform;


  if (_effektifFields.expressionUtils.isNested(fieldDefinition.binding.expression) && configKey === 'defaultValue') {
    return null;
  }

  var variable = _effektifFields.expressionUtils.getVariable(variables, fieldDefinition.binding.expression);
  var configurationTarget = target;
  if ((0, _lodash.isFunction)(target)) {
    configurationTarget = target(fieldDefinition);
  }

  var configurationValue = void 0;
  switch (configurationTarget) {
    default:
      break;
    case 'fieldDefinition':
      configurationValue = fieldDefinition[configKey];
      break;
    case 'type':
      configurationValue = _effektifFields.dataTypeUtils.isList(variable.type) ? variable.type.elementType[configKey] : variable.type[configKey];
      break;
    case 'variable':
      configurationValue = variable[configKey];
      break;
  }

  configurationValue = transform ? transform.toEdit(configurationValue) : configurationValue;
  /* regularBoolean needs to avoid tri-state otherwise <NoValue /> is rendered */
  return regularBoolean ? !!configurationValue : configurationValue;
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/getConfigurationValue.js