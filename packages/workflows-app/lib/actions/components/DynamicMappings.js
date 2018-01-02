'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends7 = require('babel-runtime/helpers/extends');

var _extends8 = _interopRequireDefault(_extends7);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _effektifApi = require('@signavio/effektif-api');

var _effektifFields = require('@signavio/effektif-fields');

var _variables = require('../../variables');

var _DynamicInputs = require('./DynamicInputs');

var _DynamicInputs2 = _interopRequireDefault(_DynamicInputs);

var _DynamicOutputs = require('./DynamicOutputs');

var _DynamicOutputs2 = _interopRequireDefault(_DynamicOutputs);

var _InputOutputTabs = require('./InputOutputTabs');

var _InputOutputTabs2 = _interopRequireDefault(_InputOutputTabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DynamicMappings(props) {
  var readOnly = props.readOnly,
      inputs = props.inputs,
      outputs = props.outputs,
      fetchInputs = props.fetchInputs,
      fetchOutputs = props.fetchOutputs,
      onOutputAdd = props.onOutputAdd,
      onOutputRemove = props.onOutputRemove,
      onOutputRename = props.onOutputRename,
      onChangeInputs = props.onChangeInputs;


  if (fetchInputs.pending || fetchOutputs.pending) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading input and output configuration...')
    );
  }

  if (fetchInputs.rejected || fetchOutputs.rejected) {
    return _react2.default.createElement(
      _hints.Hint,
      { danger: true },
      (0, _signavioI18n2.default)('The following error prevented loading the input configuration: __error__', {
        error: fetchInputs.reason || fetchOutputs.reason
      })
    );
  }

  return _react2.default.createElement(_InputOutputTabs2.default, {
    inputs: _react2.default.createElement(_DynamicInputs2.default, {
      readOnly: readOnly,
      value: inputs,
      onChange: onChangeInputs,
      inputDescriptors: fetchInputs.value
    }),
    outputs: _react2.default.createElement(_DynamicOutputs2.default, {
      readOnly: readOnly,
      value: outputs,
      outputDescriptors: fetchOutputs.value,
      onAdd: onOutputAdd,
      onRemove: onOutputRemove,
      onRename: onOutputRename
    })
  });
}


var findOutput = function findOutput(outputs, variables, outputDescriptor) {
  var key = outputDescriptor.key,
      type = outputDescriptor.type;


  if (!outputs[key]) {
    return null;
  }

  var currentOutput = variables.find(function (_ref) {
    var id = _ref.id;
    return id === outputs[key];
  });
  var currentType = currentOutput && currentOutput.type;

  if (currentType && _effektifFields.dataTypeUtils.convertsTo(type, currentType)) {
    // we can reuse the current var

    return currentOutput.id;
  }

  return null;
};

var enhance = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref2) {
  var workflowId = _ref2.workflowId,
      actionId = _ref2.actionId,
      refresh = _ref2.refresh;
  return {
    fetchInputs: {
      type: _effektifApi.types.INPUT_DESCRIPTORS,
      query: {
        workflowId: workflowId,
        actionId: actionId
      },
      refresh: refresh
    },
    fetchOutputs: {
      type: _effektifApi.types.OUTPUT_DESCRIPTORS,
      query: {
        workflowId: workflowId,
        actionId: actionId
      },
      refresh: refresh
    }
  };
}), (0, _recompose.defaultProps)({
  outputs: {},
  inputs: {}
}), _effektifFields.getFieldsContext, (0, _recompose.withHandlers)({
  onOutputAdd: function onOutputAdd(_ref3) {
    var onChangeOutputs = _ref3.onChangeOutputs,
        outputs = _ref3.outputs,
        variables = _ref3.variables;
    return function (outputDescriptor) {
      var key = outputDescriptor.key,
          type = outputDescriptor.type,
          name = outputDescriptor.name;


      var currentOutput = findOutput(outputs, variables, outputDescriptor);

      if (currentOutput) {
        onChangeOutputs((0, _extends8.default)({}, outputs, (0, _defineProperty3.default)({}, key, currentOutput)), []);

        return;
      }

      var newVariable = {
        id: _variables.variableUtils.provideId(),
        type: type,
        name: name
      };

      var newOutputs = (0, _extends8.default)({}, outputs, (0, _defineProperty3.default)({}, key, newVariable.id));

      onChangeOutputs(newOutputs, [newVariable]);
    };
  },
  onOutputRemove: function onOutputRemove(_ref4) {
    var outputs = _ref4.outputs,
        onChangeOutputs = _ref4.onChangeOutputs;
    return function (output) {
      return onChangeOutputs((0, _lodash.reduce)(outputs, function (result, variableId, outputKey) {
        if (outputKey === output.key) {
          return result;
        }

        return (0, _extends8.default)({}, result, (0, _defineProperty3.default)({}, outputKey, variableId));
      }, {}));
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        fetchOutputs = _props.fetchOutputs,
        autoCreateOutputs = _props.autoCreateOutputs,
        outputs = _props.outputs,
        variables = _props.variables,
        onChangeOutputs = _props.onChangeOutputs;


    if (fetchOutputs.pending && !nextProps.fetchOutputs.pending) {
      if (!autoCreateOutputs) {
        return;
      }

      var outputDescriptors = nextProps.fetchOutputs.value;

      var _reduce = (0, _lodash.reduce)(outputDescriptors, function (result, outputDescriptor) {
        var key = outputDescriptor.key,
            type = outputDescriptor.type,
            name = outputDescriptor.name;

        var currentOutput = findOutput(outputs, variables, outputDescriptor);

        if (currentOutput) {
          return (0, _extends8.default)({}, result, {

            newOutputs: (0, _extends8.default)({}, result.newOutputs, (0, _defineProperty3.default)({}, key, currentOutput))
          });
        }

        var newVariable = {
          id: _variables.variableUtils.provideId(),
          type: type,
          name: name
        };

        return {
          newOutputs: (0, _extends8.default)({}, result.newOutputs, (0, _defineProperty3.default)({}, key, newVariable.id)),
          newVariables: [].concat((0, _toConsumableArray3.default)(result.newVariables), [newVariable])
        };
      }, {
        newOutputs: {},
        newVariables: []
      }),
          newOutputs = _reduce.newOutputs,
          _newVariables = _reduce.newVariables;

      onChangeOutputs(newOutputs, _newVariables);
    }
  }
}));

exports.default = enhance(DynamicMappings);


// WEBPACK FOOTER //
// ./packages/workflows-app/lib/actions/components/DynamicMappings.js