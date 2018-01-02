'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _utils = require('@signavio/effektif-commons/lib/utils');

var _reactForms = require('@signavio/react-forms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)({
  width: 50
}), (0, _recompose.mapProps)(function (_ref) {
  var value = _ref.value,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['value']);
  return (0, _extends3.default)({
    min: 0,
    value: value
  }, rest);
}), (0, _recompose.withHandlers)({
  onComplete: function onComplete(_ref2) {
    var unit = _ref2.unit,
        onChange = _ref2.onChange;
    return function (value) {
      onChange(Math.round(value), unit);
    };
  }
}), (0, _components.omitProps)(['onChange', 'unit']), (0, _reactForms.semicontrollable)(), (0, _recompose.withHandlers)({
  onKeyUp: function onKeyUp(_ref3) {
    var value = _ref3.value,
        onComplete = _ref3.onComplete,
        _onKeyUp = _ref3.onKeyUp;
    return function (ev) {
      if (_onKeyUp) {
        _onKeyUp(ev);
      }

      if (_utils.KeyUtils.isArrowUp(ev)) {
        onComplete(value + 1);
      }

      if (_utils.KeyUtils.isArrowDown(ev)) {
        onComplete(Math.max(0, value - 1));
      }
    };
  }
}), _reactForms.triggerOnCompleteOnBlur, _reactForms.triggerOnCompleteOnEnter)(_reactForms.Number);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/duration/components/UnitEdit.js