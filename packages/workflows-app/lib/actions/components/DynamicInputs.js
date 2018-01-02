'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _effektifFields = require('@signavio/effektif-fields');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _variables = require('../../variables');

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DynamicInputs(props) {
  var inputDescriptors = props.inputDescriptors,
      value = props.value,
      readOnly = props.readOnly,
      onChange = props.onChange,
      onCreateVariable = props.onCreateVariable;

  if (!inputDescriptors || inputDescriptors.length === 0) {
    return _react2.default.createElement(
      _hints.Hint,
      { info: true },
      (0, _signavioI18n2.default)('This action does not require any inputs.')
    );
  }

  return _react2.default.createElement(
    _components.List,
    null,
    _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)('This action needs to be configured with some data. ' + 'You can either enter static values or link the inputs ' + 'with data that already exists in this workflow.')
    ),
    inputDescriptors.map(function (inputDescriptor) {
      return _react2.default.createElement(_Input2.default, {
        key: inputDescriptor.key,
        input: inputDescriptor,
        type: inputDescriptor.type,
        value: value[inputDescriptor.key],
        readOnly: readOnly,
        onCreateVariable: onCreateVariable,
        onChange: onChange
      });
    })
  );
}


var enhance = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onCreateVariable: function onCreateVariable(_ref) {
    var value = _ref.value,
        onChange = _ref.onChange;
    return function (key, _ref2) {
      var type = _ref2.type,
          name = _ref2.name;

      var newVariable = {
        id: _variables.variableUtils.provideId(),
        type: type,
        name: name
      };

      onChange((0, _extends5.default)({}, value, (0, _defineProperty3.default)({}, key, { expression: newVariable.id })), [newVariable]);
    };
  },
  onChange: function (_onChange) {
    function onChange(_x) {
      return _onChange.apply(this, arguments);
    }

    onChange.toString = function () {
      return _onChange.toString();
    };

    return onChange;
  }(function (_ref3) {
    var value = _ref3.value,
        onChange = _ref3.onChange;
    return function (key, name, binding) {
      return onChange((0, _extends5.default)({}, value, (0, _defineProperty3.default)({}, key, binding)), []);
    };
  })
}), _effektifFields.getFieldsContext);

exports.default = enhance(DynamicInputs);


// WEBPACK FOOTER //
// ./packages/workflows-app/lib/actions/components/DynamicInputs.js