'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifConditions = require('@signavio/effektif-conditions');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConditionEditor = function ConditionEditor(_ref) {
  var conditions = _ref.conditions,
      filterBindables = _ref.filterBindables,
      onConditionChange = _ref.onConditionChange,
      onTypeChange = _ref.onTypeChange,
      readOnly = _ref.readOnly,
      style = _ref.style,
      type = _ref.type;
  return _react2.default.createElement(
    _components.List,
    style,
    _react2.default.createElement(_effektifConditions.NAryOperatorSelect, {
      onChange: onTypeChange,
      type: type,
      readOnly: readOnly
    }),
    _react2.default.createElement(_effektifConditions.BinaryConditions, {
      conditions: conditions,
      filterBindables: filterBindables,
      onChange: onConditionChange,
      readOnly: readOnly
    })
  );
};

var TYPE_BLACKLIST = ['caseId', 'oid'];

var isAllowedType = function isAllowedType(type) {
  return !(0, _lodash.includes)(TYPE_BLACKLIST, type.name);
};

exports.default = (0, _recompose.compose)(_effektifFields.getFieldsContext, (0, _recompose.withHandlers)({
  filterBindables: function filterBindables(_ref2) {
    var dataTypeDescriptors = _ref2.dataTypeDescriptors,
        fieldDefinition = _ref2.fieldDefinition,
        variables = _ref2.variables;
    return function (bindable) {
      var type = _effektifFields.bindingUtils.getType(dataTypeDescriptors, variables, bindable);

      return fieldDefinition.binding.expression !== bindable.expression && isAllowedType(type);
    };
  },
  onConditionChange: function onConditionChange(_ref3) {
    var onChange = _ref3.onChange,
        type = _ref3.type;
    return function (conditions) {
      onChange({ type: type, conditions: conditions });
    };
  },
  onTypeChange: function onTypeChange(_ref4) {
    var conditions = _ref4.conditions,
        onChange = _ref4.onChange;
    return function (type) {
      onChange({ type: type, conditions: conditions });
    };
  }
}))(ConditionEditor);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/rules/ConditionEditor.js