'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = resolveConfigurations;

var _lodash = require('lodash');

var _resolveDescriptor = require('./resolveDescriptor');

var _resolveDescriptor2 = _interopRequireDefault(_resolveDescriptor);

var _getReadOnly = require('./getReadOnly');

var _getReadOnly2 = _interopRequireDefault(_getReadOnly);

var _getConfigurationType = require('./getConfigurationType');

var _getConfigurationType2 = _interopRequireDefault(_getConfigurationType);

var _getConfigurationValue = require('./getConfigurationValue');

var _getConfigurationValue2 = _interopRequireDefault(_getConfigurationValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveConfigurations(fieldDefinition, readOnly, dataTypeDescriptors, variables, transformConfiguration) {
  var elementTypeDescriptor = (0, _resolveDescriptor2.default)(fieldDefinition, dataTypeDescriptors, variables);
  var sortedConfigKeys = (0, _lodash.map)(elementTypeDescriptor.configs, function (configuration, key) {
    return (0, _extends3.default)({}, configuration, { key: key });
  }).map(function (configuration) {
    return transformConfiguration ? transformConfiguration(fieldDefinition, configuration) : configuration;
  }).filter(function (_ref) {
    var hide = _ref.hide;

    if (hide && (0, _lodash.isFunction)(hide)) {
      return !hide(fieldDefinition);
    }
    return true;
  });

  return (0, _lodash.sortBy)(sortedConfigKeys, 'position').map(function (_ref2) {
    var key = _ref2.key,
        localReadOnly = _ref2.readOnly;
    return (0, _extends3.default)({}, (0, _lodash.omit)(elementTypeDescriptor.configs[key], ['disabled', 'hasWidget', 'hide', 'position', 'target']), {
      configKey: key,
      key: key,
      inline: (0, _lodash.isUndefined)(elementTypeDescriptor.configs[key].regularBoolean),
      readOnly: (0, _getReadOnly2.default)(fieldDefinition, readOnly || localReadOnly, (0, _extends3.default)({}, elementTypeDescriptor.configs[key], {
        configKey: key
      }), variables),
      type: (0, _getConfigurationType2.default)(fieldDefinition, elementTypeDescriptor.configs[key], dataTypeDescriptors, variables),
      value: (0, _getConfigurationValue2.default)(fieldDefinition, (0, _extends3.default)({}, elementTypeDescriptor.configs[key], {
        configKey: key
      }), variables)
    });
  });
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/resolveConfigurations.js