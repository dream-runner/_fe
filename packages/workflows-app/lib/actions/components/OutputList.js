'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _effektifFields = require('@signavio/effektif-fields');

var _Output = require('./Output');

var _Output2 = _interopRequireDefault(_Output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OutputList(_ref) {
  var outputs = _ref.outputs,
      value = _ref.value,
      readOnly = _ref.readOnly,
      variables = _ref.variables,
      onRemove = _ref.onRemove,
      onChange = _ref.onChange;

  if (outputs.length === 0) {
    return _react2.default.createElement(
      _hints.Hint,
      { info: true },
      (0, _signavioI18n2.default)("You aren't using any outputs of this activity in your workflow.")
    );
  }

  return _react2.default.createElement(
    _components.List,
    null,
    (0, _lodash.map)(outputs, function (output) {
      var variable = (0, _lodash.find)(variables, function (variable) {
        return variable.id === value[output.key];
      });

      return _react2.default.createElement(_Output2.default, {
        key: output.key,
        output: output,
        variable: variable,
        onChange: onChange,
        onRemove: onRemove,
        readOnly: readOnly
      });
    })
  );
}
exports.default = (0, _effektifFields.getFieldsContext)(OutputList);


// WEBPACK FOOTER //
// ./packages/workflows-app/lib/actions/components/OutputList.js