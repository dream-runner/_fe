'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNested = exports.defaultNameForType = exports.resolveType = exports.resolveName = exports.getVariable = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _dataTypes = require('../dataTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unnamedIndex = (0, _lodash.curry)(function (variables, variable) {
  var index = 0;
  var variableTypeName = (0, _dataTypes.isList)(variable.type) ? variable.type.elementType.name : variable.type.name;

  for (var l = variables.length, i = 0; i < l; i += 1) {
    var currentVariableTypeName = (0, _dataTypes.isList)(variables[i].type) ? variables[i].type.elementType.name : variables[i].type.name;

    if (!variables[i].name && currentVariableTypeName === variableTypeName) {
      index += 1;
    }
    if (variables[i] === variable) {
      break;
    }
  }
  return index;
});

var varName = (0, _lodash.curry)(function (dataTypeDescriptors, variables, variable) {
  if (variable.name) {
    return variable.name;
  }

  var index = unnamedIndex(variables, variable);

  return defaultNameForType(dataTypeDescriptors, variables, variable.type) + (index > 1 ? ' ' + index : '');
});

var getVariable = exports.getVariable = (0, _lodash.curry)(function (variables, expression) {
  var _expression$split = expression.split('.'),
      _expression$split2 = (0, _slicedToArray3.default)(_expression$split, 1),
      id = _expression$split2[0];

  return (0, _lodash.find)(variables, { id: id });
});

var resolveName = exports.resolveName = (0, _lodash.curry)(function (dataTypeDescriptors, variables, expression) {
  var _expression$split3 = expression.split('.'),
      _expression$split4 = (0, _toArray3.default)(_expression$split3),
      id = _expression$split4[0],
      fields = _expression$split4.slice(1);

  var variable = (0, _lodash.find)(variables, { id: id });

  var type = variable.type;

  return [varName(dataTypeDescriptors, variables, variable)].concat((0, _toConsumableArray3.default)(fields.map(function (key) {
    var descriptor = (0, _dataTypes.getDescriptor)(dataTypeDescriptors, type);
    var field = (0, _lodash.find)(descriptor.fields, { key: key });
    type = field.type;

    return field.name;
  }))).join(' / ');
});

var resolveType = exports.resolveType = (0, _lodash.curry)(function (dataTypeDescriptors, variables, expression) {
  var _expression$split5 = expression.split('.'),
      _expression$split6 = (0, _toArray3.default)(_expression$split5),
      id = _expression$split6[0],
      fields = _expression$split6.slice(1);

  var _find = (0, _lodash.find)(variables, { id: id }),
      type = _find.type;

  for (var i = 0; i < fields.length; i += 1) {
    var descriptor = (0, _dataTypes.getDescriptor)(dataTypeDescriptors, type);
    type = (0, _lodash.find)(descriptor.fields, { key: fields[i] }).type;
  }

  if (!type) {
    throw new Error('Type not found for binding #' + expression);
  }

  return type;
});

var defaultNameForType = exports.defaultNameForType = (0, _lodash.curry)(function (dataTypeDescriptors, variables, type) {
  var dataTypeDescriptor = (0, _dataTypes.getDescriptor)(dataTypeDescriptors, (0, _dataTypes.isList)(type) ? type.elementType : type);

  if ((0, _dataTypes.isList)(type)) {
    return (0, _signavioI18n2.default)('Unnamed List of __elementType__', {
      elementType: dataTypeDescriptor.namePlural || dataTypeDescriptor.name
    });
  }

  return (0, _signavioI18n2.default)('Unnamed __type__', { type: dataTypeDescriptor.name });
});

var isNested = exports.isNested = function isNested(expression) {
  return expression.indexOf('.') >= 0;
};


// WEBPACK FOOTER //
// ./packages/fields/lib/expressions/index.js