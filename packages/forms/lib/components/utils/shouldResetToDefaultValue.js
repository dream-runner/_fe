'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shouldResetToDefaultValue;


var willBecomeInvisible = function willBecomeInvisible(currentField, nextField) {
  return currentField.visible && !nextField.visible;
};

var willBecomeReadOnly = function willBecomeReadOnly(currentField, nextField) {
  return !currentField.readOnly && nextField.readOnly;
};

function shouldResetToDefaultValue(defaultField, currentField, nextField) {
  if (willBecomeInvisible(currentField, nextField) || willBecomeReadOnly(currentField, nextField)) {
    return defaultField.value !== nextField.value;
  }

  return false;
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/shouldResetToDefaultValue.js