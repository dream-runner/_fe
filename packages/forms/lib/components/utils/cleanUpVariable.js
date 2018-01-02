'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanUpVariable;

var _effektifFields = require('@signavio/effektif-fields');

var _cleanUpChoiceVariable = require('./cleanUpChoiceVariable');

var _cleanUpChoiceVariable2 = _interopRequireDefault(_cleanUpChoiceVariable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cleanUpVariable(variable) {
  if (_effektifFields.dataTypeUtils.isList(variable.type)) {
    if (_effektifFields.dataTypeUtils.isChoice(variable.type.elementType)) {
      return (0, _cleanUpChoiceVariable2.default)(variable);
    }

    return variable;
  }

  if (_effektifFields.dataTypeUtils.isChoice(variable.type)) {
    return (0, _cleanUpChoiceVariable2.default)(variable);
  }

  return variable;
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/cleanUpVariable.js