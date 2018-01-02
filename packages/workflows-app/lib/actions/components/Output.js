'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Output(_ref) {
  var output = _ref.output,
      variable = _ref.variable,
      labelId = _ref.labelId,
      readOnly = _ref.readOnly,
      variables = _ref.variables,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      onRemove = _ref.onRemove,
      onComplete = _ref.onComplete;

  return _react2.default.createElement(
    _tiles.Tile,
    {
      icon: _effektifFields.dataTypeUtils.getIcon(dataTypeDescriptors, output.type),
      toolbar: _react2.default.createElement(_buttons.RemoveButton, { disabled: readOnly, onClick: onRemove })
    },
    _react2.default.createElement(_effektifFields.Field, {
      noClear: true,
      readOnly: readOnly,
      id: labelId,
      type: (0, _effektifFields.textType)(),
      value: variable.name,
      onComplete: onComplete
    })
  );
}
exports.default = (0, _recompose.compose)(_effektifFields.getFieldsContext, (0, _recompose.withHandlers)({
  onComplete: function onComplete(_ref2) {
    var variable = _ref2.variable,
        onChange = _ref2.onChange;
    return function (name) {
      return onChange((0, _extends3.default)({}, variable, {
        name: name
      }));
    };
  },
  onRemove: function (_onRemove) {
    function onRemove(_x) {
      return _onRemove.apply(this, arguments);
    }

    onRemove.toString = function () {
      return _onRemove.toString();
    };

    return onRemove;
  }(function (_ref3) {
    var output = _ref3.output,
        onRemove = _ref3.onRemove;
    return function () {
      return onRemove(output);
    };
  })
}), (0, _recompose.withProps)(function (_ref4) {
  var output = _ref4.output;
  return {
    label: output.name
  };
}), _forms.withLabel)(Output);


// WEBPACK FOOTER //
// ./packages/workflows-app/lib/actions/components/Output.js