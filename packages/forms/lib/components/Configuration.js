'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Configuration(_ref) {
  var configuration = _ref.configuration,
      fieldDefinition = _ref.fieldDefinition,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['configuration', 'fieldDefinition']);

  var WidgetComponent = configuration.widget && configuration.widget();
  if (WidgetComponent) {
    return _react2.default.createElement(WidgetComponent, (0, _extends3.default)({ dataType: configuration.type }, rest, configuration));
  }

  if (configuration.regularBoolean) {
    var isReadOnlyIntermediate = configuration.configKey === 'readOnly' && fieldDefinition.customRules && !!fieldDefinition.readOnlyCondition;

    var isRequiredIntermediate = configuration.configKey === 'required' && fieldDefinition.customRules && !!fieldDefinition.requiredCondition;

    return _react2.default.createElement(_effektifFields.Field, (0, _extends3.default)({
      indeterminate: isReadOnlyIntermediate || isRequiredIntermediate,
      regularBoolean: true
    }, rest, (0, _lodash.omit)(configuration, 'configKey')));
  }

  return _react2.default.createElement(_effektifFields.LabeledField, (0, _extends3.default)({}, rest, (0, _lodash.omit)(configuration, 'configKey')));
}
exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onComplete: function onComplete(_ref2) {
    var configuration = _ref2.configuration,
        onConfigurationChange = _ref2.onConfigurationChange;
    return function (value) {
      return onConfigurationChange(configuration.key, value);
    };
  }
}), (0, _components.omitProps)(['configKey', 'onConfigurationChange']))(Configuration);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/Configuration.js