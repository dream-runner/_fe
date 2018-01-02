'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBoundToNestedField = isBoundToNestedField;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _expressions = require('../expressions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return {
    name: {
      target: function target(fieldDefinition) {
        return isBoundToNestedField(fieldDefinition) ? 'fieldDefinition' : 'variable';
      },
      placeholder: (0, _signavioI18n2.default)('Label'),
      type: { name: 'text' },
      position: 0
    },
    description: {
      target: function target(fieldDefinition) {
        return isBoundToNestedField(fieldDefinition) ? 'fieldDefinition' : 'variable';
      },
      label: (0, _signavioI18n2.default)('Description'),
      placeholder: (0, _signavioI18n2.default)('Enter a description (optional)'),
      type: {
        name: 'text',
        multiLine: true
      },
      position: 1
    },
    defaultValue: {
      target: 'variable',
      label: (0, _signavioI18n2.default)('Initial value'),
      type: function type(dataTypeDescriptors, variables, fieldDefinition) {
        var expression = fieldDefinition.binding.expression;

        return (0, _expressions.resolveType)(dataTypeDescriptors, variables, expression);
      },
      hide: isBoundToNestedField,
      placeholder: (0, _signavioI18n2.default)('Initial value'),
      position: 2
    },
    readOnly: {
      target: 'fieldDefinition',
      label: (0, _signavioI18n2.default)('Read only'),
      type: { name: 'boolean' },
      disabled: isBoundToNestedField,
      regularBoolean: true,
      position: 3
    },
    required: {
      target: 'fieldDefinition',
      label: (0, _signavioI18n2.default)('Mandatory'),
      type: { name: 'boolean' },
      disabled: function disabled(fieldDefinition) {
        return fieldDefinition.readOnly;
      },
      regularBoolean: true,
      position: 4
    },
    customRules: {
      feature: 'Component.DynamicForms',
      target: 'fieldDefinition',
      label: (0, _signavioI18n2.default)('Define custom rules'),
      type: { name: 'boolean' },
      disabled: isBoundToNestedField,
      regularBoolean: true,
      position: 5
    }
  };
};

function isBoundToNestedField(fieldDefinition) {
  var expression = fieldDefinition.binding.expression;

  return (0, _expressions.isNested)(expression);
}


// WEBPACK FOOTER //
// ./packages/fields/lib/dataTypes/baseConfigs.js