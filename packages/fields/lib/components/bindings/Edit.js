'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _dataTypes = require('../../dataTypes');

var _expressions = require('../../expressions');

var _bindings = require('../../bindings');

var _getFieldsContext = require('../getFieldsContext');

var _getFieldsContext2 = _interopRequireDefault(_getFieldsContext);

var _EditExpression = require('./EditExpression');

var _EditExpression2 = _interopRequireDefault(_EditExpression);

var _EditValueOrExpression = require('./EditValueOrExpression');

var _EditValueOrExpression2 = _interopRequireDefault(_EditValueOrExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditBinding = function EditBinding(_ref) {
  var binding = _ref.binding,
      bindables = _ref.bindables,
      type = _ref.type,
      allowStatic = _ref.allowStatic,
      canClear = _ref.canClear,
      placeholder = _ref.placeholder,
      allowCreate = _ref.allowCreate,
      readOnly = _ref.readOnly,
      light = _ref.light,
      onChange = _ref.onChange,
      onCreateVariable = _ref.onCreateVariable,
      onExpressionChange = _ref.onExpressionChange;

  if (!allowStatic || binding && binding.expression || !type) {
    return _react2.default.createElement(_EditExpression2.default, {
      allowCreate: allowCreate,
      readOnly: readOnly,
      light: light,
      canClear: canClear,
      bindables: bindables,
      expression: binding && binding.expression,
      type: type,
      placeholder: placeholder,
      onChange: onExpressionChange,
      onCreateVariable: onCreateVariable
    });
  }

  return _react2.default.createElement(_EditValueOrExpression2.default, {
    readOnly: readOnly,
    allowCreate: allowCreate,
    bindables: bindables,
    binding: binding,
    type: type,
    placeholder: placeholder,
    onChange: onChange,
    onCreateVariable: onCreateVariable
  });
};


EditBinding.defaultProps = {
  onChange: function onChange() {}
};

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onExpressionChange: function onExpressionChange(_ref2) {
    var onChange = _ref2.onChange;
    return function (expression) {
      if ((0, _lodash.isNil)(expression)) {
        onChange(null);
      } else {
        onChange({ expression: expression });
      }
    };
  }
}), _getFieldsContext2.default, (0, _recompose.withProps)(function (_ref3) {
  var bindables = _ref3.bindables,
      type = _ref3.type,
      sortBindables = _ref3.sortBindables,
      filterBindables = _ref3.filterBindables,
      dataTypeDescriptors = _ref3.dataTypeDescriptors,
      variables = _ref3.variables;
  return {
    bindables: (0, _lodash.sortBy)((0, _lodash.filter)(bindables || (0, _bindings.unfoldBindables)(dataTypeDescriptors, variables), function (bindable) {
      if (type) {
        var isCompatibleWithType = (0, _dataTypes.convertsTo)(type, (0, _expressions.resolveType)(dataTypeDescriptors, variables, bindable.expression));

        if (!isCompatibleWithType) {
          return false;
        }
      }

      var rootType = (0, _bindings.getType)(dataTypeDescriptors, variables, (0, _bindings.getRoot)(bindable));

      var rootDescriptor = (0, _dataTypes.getDescriptor)(dataTypeDescriptors, rootType);

      if (rootDescriptor && rootDescriptor.deleted) {
        return false;
      }

      if (filterBindables) {
        return filterBindables(bindable, dataTypeDescriptors, variables);
      }

      return true;
    }), function (bindable) {
      return sortBindables ? sortBindables(bindable, dataTypeDescriptors, variables) : (0, _expressions.resolveName)(dataTypeDescriptors, variables, bindable.expression);
    })
  };
}))(EditBinding);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/Edit.js