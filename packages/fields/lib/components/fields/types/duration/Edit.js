'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recompose = require('recompose');

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _reactForms = require('@signavio/react-forms');

var _higherOrder = require('../../higher-order');

var _utils = require('./utils');

var _higherOrder2 = require('./higher-order');

var _components2 = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DurationInput = (0, _recompose.compose)((0, _recompose.withProps)(function (_ref) {
  var value = _ref.value,
      units = _ref.units;
  return {
    value: (0, _lodash.isNumber)(value) ? (0, _utils.compileMessage)(value, units) : '',
    readOnly: true,
    placeholder: (0, _signavioI18n2.default)('Click to set a duration')
  };
}), (0, _components.omitProps)(['isExpanded', 'units']), (0, _styles.defaultStyle)({
  width: '100%'
}))(_forms.Text);


var styled = (0, _styles.defaultStyle)({
  display: 'block'
});

var DurationEdit = (0, _reactForms.stickWidgetToInput)(_components2.DurationHandles, DurationInput);

exports.default = (0, _recompose.compose)((0, _higherOrder.createClearable)({ triggerOnComplete: true }), _higherOrder2.withDurationUnits, styled)(DurationEdit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/duration/Edit.js