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

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Input(_ref) {
  var input = _ref.input,
      value = _ref.value,
      readOnly = _ref.readOnly,
      onCreateVariable = _ref.onCreateVariable,
      onChange = _ref.onChange,
      label = _ref.label;
  var type = input.type;


  return _react2.default.createElement(_effektifFields.LabeledBinding, {
    binding: value,
    label: label,
    allowStatic: true,
    allowCreate: true,
    canClear: true,
    readOnly: readOnly,
    type: type,
    onCreateVariable: onCreateVariable,
    onChange: onChange
  });
}
exports.default = (0, _recompose.compose)((0, _recompose.mapProps)(function (_ref2) {
  var input = _ref2.input,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['input']);
  return (0, _extends3.default)({}, rest, {
    input: input,
    label: input.name
  });
}), (0, _recompose.withHandlers)({
  onCreateVariable: function (_onCreateVariable) {
    function onCreateVariable(_x) {
      return _onCreateVariable.apply(this, arguments);
    }

    onCreateVariable.toString = function () {
      return _onCreateVariable.toString();
    };

    return onCreateVariable;
  }(function (_ref3) {
    var input = _ref3.input,
        onCreateVariable = _ref3.onCreateVariable;
    return function (variable) {
      return onCreateVariable(input.key, variable);
    };
  }),
  onChange: function (_onChange) {
    function onChange(_x2) {
      return _onChange.apply(this, arguments);
    }

    onChange.toString = function () {
      return _onChange.toString();
    };

    return onChange;
  }(function (_ref4) {
    var input = _ref4.input,
        onChange = _ref4.onChange;
    return function (binding) {
      var key = input.key,
          name = input.name;


      onChange(key, name, binding);
    };
  })
}))(Input);


// WEBPACK FOOTER //
// ./packages/workflows-app/lib/actions/components/Input.js