'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = cleanUpChoiceVariable;

var _lodash = require('lodash');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exists = function exists(options, value) {
  return (0, _lodash.find)(options, function (option) {
    return option.id === value;
  });
};

function cleanUpChoiceVariable(variable) {
  if (!variable.defaultValue || (0, _lodash.isEmpty)(variable.defaultValue)) {
    return variable;
  }

  if (_effektifFields.dataTypeUtils.isList(variable.type)) {
    return (0, _extends3.default)({}, variable, {
      defaultValue: variable.defaultValue.filter(function (value) {
        return exists(variable.type.elementType.options, value);
      })
    });
  }

  if (!exists(variable.type.options, variable.defaultValue)) {
    variable.defaultValue = null;
  }

  return variable;
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/cleanUpChoiceVariable.js