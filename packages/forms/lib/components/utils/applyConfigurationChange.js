'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = applyConfigurationChange;

var _lodash = require('lodash');

var _effektifFields = require('@signavio/effektif-fields');

var _resolveDescriptor = require('./resolveDescriptor');

var _resolveDescriptor2 = _interopRequireDefault(_resolveDescriptor);

var _customReadOnlyChange = require('./customReadOnlyChange');

var _customReadOnlyChange2 = _interopRequireDefault(_customReadOnlyChange);

var _customRequiredChange = require('./customRequiredChange');

var _customRequiredChange2 = _interopRequireDefault(_customRequiredChange);

var _customRulesChange = require('./customRulesChange');

var _customRulesChange2 = _interopRequireDefault(_customRulesChange);

var _customVisibilityChange = require('./customVisibilityChange');

var _customVisibilityChange2 = _interopRequireDefault(_customVisibilityChange);

var _cleanUpVariable = require('./cleanUpVariable');

var _cleanUpVariable2 = _interopRequireDefault(_cleanUpVariable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCustomChange = function isCustomChange(key) {
  return (0, _lodash.includes)(['customReadOnly', 'customRequired', 'customVisibility', 'customRules'], key);
};

var applyCustomChange = function applyCustomChange(key, fieldDefinition, newValue) {
  switch (key) {
    default:
      return fieldDefinition;
    case 'customReadOnly':
      return (0, _customReadOnlyChange2.default)(fieldDefinition, newValue);
    case 'customRequired':
      return (0, _customRequiredChange2.default)(fieldDefinition, newValue);
    case 'customVisibility':
      return (0, _customVisibilityChange2.default)(fieldDefinition, newValue);
    case 'customRules':
      return (0, _customRulesChange2.default)(fieldDefinition, newValue);
  }
};

function applyConfigurationChange(dataTypeDescriptors, variables, fieldDefinition, key, newValue) {
  var variable = _effektifFields.expressionUtils.getVariable(variables, fieldDefinition.binding.expression);

  if (isCustomChange(key)) {
    return {
      fieldDefinition: applyCustomChange(key, fieldDefinition, newValue),
      variable: variable
    };
  }

  var elementTypeDescriptor = (0, _resolveDescriptor2.default)(fieldDefinition, dataTypeDescriptors, variables);

  var _elementTypeDescripto = elementTypeDescriptor.configs[key],
      transform = _elementTypeDescripto.transform,
      target = _elementTypeDescripto.target,
      widget = _elementTypeDescripto.widget;

  var value = transform ? transform.fromEdit(newValue) : newValue;
  var configurationTarget = (0, _lodash.isFunction)(target) ? target(fieldDefinition) : target;

  var variableIndex = variables.indexOf(variable);
  var valueToPropagate = void 0;

  switch (configurationTarget) {
    case 'fieldDefinition':
      {
        return {
          fieldDefinition: getValueToPropagate(widget, key, fieldDefinition, value),
          variable: variable
        };
      }
    case 'type':
      {
        var type = getAffectedType(variable);

        var typeChange = getValueToPropagate(widget, key, type, value);

        return {
          fieldDefinition: fieldDefinition,
          variable: applyTypeChange(variable, typeChange)
        };
      }
    case 'variable':
      {
        return {
          fieldDefinition: fieldDefinition,
          variable: getValueToPropagate(widget, key, variable, value)
        };
      }
  }
}

function getValueToPropagate(widget, key, currentValue, newValue) {
  if (widget) {
    return newValue;
  }

  return (0, _extends4.default)({}, currentValue, (0, _defineProperty3.default)({}, key, newValue));
}

var getAffectedType = function getAffectedType(variable) {
  if (_effektifFields.dataTypeUtils.isList(variable.type)) {
    return variable.type.elementType;
  }

  return variable.type;
};

var applyTypeChange = function applyTypeChange(variable, value) {
  if (_effektifFields.dataTypeUtils.isList(variable.type)) {
    return (0, _cleanUpVariable2.default)((0, _extends4.default)({}, variable, {
      type: (0, _extends4.default)({}, variable.type, {
        elementType: (0, _extends4.default)({}, variable.type.elementType, value)
      })
    }));
  }

  return (0, _cleanUpVariable2.default)((0, _extends4.default)({}, variable, {
    type: (0, _extends4.default)({}, variable.type, value)
  }));
};


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/applyConfigurationChange.js