'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VariableCreateInput = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onBlur: function onBlur(_ref) {
    var onSubmit = _ref.onSubmit;
    return function (ev) {
      return onSubmit(ev.target.value);
    };
  }
}), (0, _recompose.withProps)(function () {
  return {
    border: 'none',
    buttonLabel: (0, _signavioI18n2.default)('Create'),
    placeholder: (0, _signavioI18n2.default)('Enter a name for the new field')
  };
}))(_components.InputWithButton);
exports.default = VariableCreateInput;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/VariableCreateInput.js