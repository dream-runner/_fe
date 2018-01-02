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

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _bindings = require('../../bindings');

var _expressions = require('../../expressions');

var _getFieldsContext = require('../getFieldsContext');

var _getFieldsContext2 = _interopRequireDefault(_getFieldsContext);

var _Show = require('./Show');

var _Show2 = _interopRequireDefault(_Show);

var _BindingOption = require('./BindingOption');

var _BindingOption2 = _interopRequireDefault(_BindingOption);

var _VariableCreateInput = require('./VariableCreateInput');

var _VariableCreateInput2 = _interopRequireDefault(_VariableCreateInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditExpression = function EditExpression(_ref) {
  var expression = _ref.expression,
      canClear = _ref.canClear,
      type = _ref.type,
      allowCreate = _ref.allowCreate,
      bindables = _ref.bindables,
      createVariable = _ref.createVariable,
      onChange = _ref.onChange,
      readOnly = _ref.readOnly,
      placeholder = _ref.placeholder,
      emptyText = _ref.emptyText,
      autoFocus = _ref.autoFocus,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables,
      style = _ref.style,
      onClear = _ref.onClear,
      onCreateVariable = _ref.onCreateVariable,
      onToggleCreate = _ref.onToggleCreate,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['expression', 'canClear', 'type', 'allowCreate', 'bindables', 'createVariable', 'onChange', 'readOnly', 'placeholder', 'emptyText', 'autoFocus', 'dataTypeDescriptors', 'variables', 'style', 'onClear', 'onCreateVariable', 'onToggleCreate']);

  if (expression) {
    return _react2.default.createElement(
      _tiles.Tile,
      { toolbar: _react2.default.createElement(_buttons.RemoveButton, { disabled: !canClear, onClick: onClear }) },
      _react2.default.createElement(_Show2.default, { binding: { expression: expression } })
    );
  }

  if (createVariable) {
    return _react2.default.createElement(_VariableCreateInput2.default, { autoFocus: true, onSubmit: onCreateVariable });
  }

  return _react2.default.createElement(
    _forms.DropdownSelect,
    (0, _extends3.default)({}, rest, {
      autoFocus: autoFocus,
      readOnly: readOnly,
      value: expression,
      placeholder: placeholder || (0, _signavioI18n2.default)('Click to select a field'),
      emptyMessage: emptyText || (0, _signavioI18n2.default)('No matching fields found'),
      onChange: onChange,
      style: style('dropdown')
    }),
    (0, _lodash.map)(bindables, function (bindable) {
      return _react2.default.createElement(_BindingOption2.default, {
        key: bindable.expression,
        name: (0, _expressions.resolveName)(dataTypeDescriptors, variables, bindable.expression),
        bindable: bindable,
        value: bindable.expression
      });
    }),
    type && allowCreate && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_components.Divider, null),
      _react2.default.createElement(
        _buttons.AddButton,
        { block: true, light: true, onClick: onToggleCreate },
        (0, _signavioI18n2.default)('Create a new __type__ field', {
          type: (0, _bindings.findDescriptorForType)(dataTypeDescriptors, type).name
        })
      )
    )
  );
};


EditExpression.defaultProps = {
  canClear: true
};

exports.default = (0, _recompose.compose)(_getFieldsContext2.default, (0, _recompose.withState)('createVariable', 'toggleCreate', false), (0, _recompose.withHandlers)({
  onClear: function onClear(_ref2) {
    var onChange = _ref2.onChange;
    return function () {
      return onChange(null);
    };
  },
  onToggleCreate: function onToggleCreate(_ref3) {
    var toggleCreate = _ref3.toggleCreate;
    return function () {
      return toggleCreate(true);
    };
  },
  onCreateVariable: function (_onCreateVariable) {
    function onCreateVariable(_x) {
      return _onCreateVariable.apply(this, arguments);
    }

    onCreateVariable.toString = function () {
      return _onCreateVariable.toString();
    };

    return onCreateVariable;
  }(function (_ref4) {
    var toggleCreate = _ref4.toggleCreate,
        type = _ref4.type,
        onCreateVariable = _ref4.onCreateVariable;
    return function (name) {
      toggleCreate(false);

      if (!name) {
        return;
      }

      onCreateVariable({ name: name, type: type });
    };
  })
}), (0, _styles.defaultStyle)({
  dropdown: {
    widget: {
      maxHeight: 350,
      outline: 'none',
      overflowY: 'auto'
    }
  }
}), (0, _components.omitProps)(['toggleCreate']))(EditExpression);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/EditExpression.js