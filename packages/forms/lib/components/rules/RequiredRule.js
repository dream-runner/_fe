'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _effektifFields = require('@signavio/effektif-fields');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _ConditionEditor = require('./ConditionEditor');

var _ConditionEditor2 = _interopRequireDefault(_ConditionEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTypeValue = function getTypeValue(fieldDefinition) {
  if (fieldDefinition.required) {
    return 'always';
  }

  if (fieldDefinition.requiredCondition) {
    return 'custom';
  }

  return 'never';
};

var RequiredRule = function RequiredRule(_ref) {
  var fieldDefinition = _ref.fieldDefinition,
      onRequiredChange = _ref.onRequiredChange,
      onTypeChange = _ref.onTypeChange,
      style = _ref.style;
  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(_effektifFields.LabeledField, {
      label: (0, _signavioI18n2.default)('This field is mandatory when:'),
      noClear: true,
      onChange: onTypeChange,
      type: (0, _effektifFields.choiceType)([{ id: 'always', name: (0, _signavioI18n2.default)('Always') }, { id: 'never', name: (0, _signavioI18n2.default)('Never') }, {
        id: 'custom',
        name: (0, _signavioI18n2.default)('The following conditions are met'),
        disabled: fieldDefinition.readOnly
      }]),
      value: getTypeValue(fieldDefinition)
    }),
    getTypeValue(fieldDefinition) === 'custom' && _react2.default.createElement(_ConditionEditor2.default, (0, _extends3.default)({
      fieldDefinition: fieldDefinition,
      onChange: onRequiredChange,
      style: style('conditionEditor')
    }, fieldDefinition.requiredCondition))
  );
};

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onRequiredChange: function onRequiredChange(_ref2) {
    var onChange = _ref2.onChange;
    return function (condition) {
      onChange({ requiredCondition: condition });
    };
  },
  onTypeChange: function onTypeChange(_ref3) {
    var onChange = _ref3.onChange;
    return function (type) {
      return onChange({ type: type });
    };
  }
}), (0, _styles.defaultStyle)(function (_ref4) {
  var padding = _ref4.padding;
  return {
    paddingTop: padding.normal,

    conditionEditor: {
      paddingTop: padding.normal
    }
  };
}))(RequiredRule);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/rules/RequiredRule.js