'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)({
  '&required': {
    label: {
      fontWeight: 'bold'
    }
  }
}, function (_ref) {
  var required = _ref.required;
  return {
    '&required': required
  };
}), _forms.withLabel)(_Field2.default);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/LabeledField.js