'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _utils = require('@signavio/effektif-commons/lib/utils');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The following types cannot be shown in a form
var TYPE_BLACKLIST = ['caseId', 'emailId', 'custom', 'oid'];

var isAllowedType = function isAllowedType(type) {
  if (type.name === 'list') {
    return type.elementType && !(0, _lodash.includes)(TYPE_BLACKLIST, type.elementType.name);
  }
  return !(0, _lodash.includes)(TYPE_BLACKLIST, type.name);
};

var FieldReuse = function FieldReuse(_ref) {
  var onBindingChange = _ref.onBindingChange,
      filterBindables = _ref.filterBindables;
  return _react2.default.createElement(_effektifFields.Binding, {
    canClear: false,
    filterBindables: filterBindables,
    light: true,
    onChange: onBindingChange,
    placeholder: (0, _signavioI18n2.default)('Click to find existing fields for reuse')
  });
};

exports.default = (0, _recompose.compose)(_effektifFields.getFieldsContext, (0, _recompose.withHandlers)({
  onBindingChange: function onBindingChange(_ref2) {
    var dataTypeDescriptors = _ref2.dataTypeDescriptors,
        variables = _ref2.variables,
        onReuse = _ref2.onReuse;
    return function (bindable) {
      onReuse({
        id: _utils.VariableUtils.provideId(),
        binding: bindable,
        name: _effektifFields.expressionUtils.isNested(bindable.expression) ? _effektifFields.expressionUtils.resolveName(dataTypeDescriptors, variables, bindable.expression) : undefined,
        readOnly: _effektifFields.expressionUtils.isNested(bindable.expression)
      });
    };
  },
  filterBindables: function filterBindables(_ref3) {
    var canReuseBindable = _ref3.canReuseBindable,
        dataTypeDescriptors = _ref3.dataTypeDescriptors,
        showNestedFields = _ref3.showNestedFields,
        variables = _ref3.variables;
    return function (bindable) {
      var type = _effektifFields.bindingUtils.getType(dataTypeDescriptors, variables, bindable);

      var isAllowed = isAllowedType(type) && (showNestedFields || !_effektifFields.expressionUtils.isNested(bindable.expression));

      if (!isAllowed) {
        return false;
      }

      if ((0, _lodash.isFunction)(canReuseBindable) && !canReuseBindable(bindable)) {
        return false;
      }

      return true;
    };
  }
}))(FieldReuse);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/FieldReuse.js