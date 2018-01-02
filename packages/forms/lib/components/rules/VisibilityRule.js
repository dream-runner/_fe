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

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifFields = require('@signavio/effektif-fields');

var _ConditionEditor = require('./ConditionEditor');

var _ConditionEditor2 = _interopRequireDefault(_ConditionEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VisibilityRule = function VisibilityRule(_ref) {
  var fieldDefinition = _ref.fieldDefinition,
      onConditionChange = _ref.onConditionChange,
      onVisibilityChange = _ref.onVisibilityChange,
      style = _ref.style;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)("Here you can configure when this field will be shown or hidden based on other field values. By default, fields will be shown after you've added them.")
    ),
    _react2.default.createElement(_effektifFields.LabeledField, {
      label: (0, _signavioI18n2.default)('Condition influences'),
      noClear: true,
      onChange: onVisibilityChange,
      type: (0, _effektifFields.choiceType)([{ id: 'isShownWhen', name: (0, _signavioI18n2.default)('When to show this field') }, { id: 'isHiddenWhen', name: (0, _signavioI18n2.default)('When to hide this field') }]),
      value: fieldDefinition.visibility
    }),
    _react2.default.createElement(_ConditionEditor2.default, (0, _extends3.default)({
      fieldDefinition: fieldDefinition,
      onChange: onConditionChange,
      style: style('conditionEditor')
    }, fieldDefinition.visibleCondition))
  );
};
exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onConditionChange: function onConditionChange(_ref2) {
    var fieldDefinition = _ref2.fieldDefinition,
        onChange = _ref2.onChange;
    return function (condition) {
      return onChange({
        visibleCondition: condition
      });
    };
  },
  onVisibilityChange: function onVisibilityChange(_ref3) {
    var fieldDefinition = _ref3.fieldDefinition,
        onChange = _ref3.onChange;
    return function (visibility) {
      return onChange({ visibility: visibility });
    };
  }
}), (0, _styles.defaultStyle)(function (_ref4) {
  var padding = _ref4.padding;
  return {
    conditionEditor: {
      paddingTop: padding.normal
    }
  };
}))(VisibilityRule);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/rules/VisibilityRule.js