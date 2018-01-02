'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNestedConnectorTypeDeeperThanOne = exports.hasShowComponentSupport = exports.isOneOfFieldsOfParentWithType = exports.parentSatisfies = exports.rootSatisfies = exports.getRoot = exports.getParent = exports.isCompatibleWithTypeName = exports.isCompatibleWithType = undefined;

var _lodash = require('lodash');

var _utils = require('./utils');

var _dataTypes = require('../dataTypes');

var _expressions = require('../expressions');

var _types = require('../components/fields/types');

var typeComponents = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var isCompatibleWithType = exports.isCompatibleWithType = (0, _lodash.curry)(function (dataTypeDescriptors, variables, dataType, binding) {
  return (0, _dataTypes.convertsTo)(dataType, (0, _utils.getType)(dataTypeDescriptors, variables, binding));
});

var isCompatibleWithTypeName = exports.isCompatibleWithTypeName = (0, _lodash.curry)(function (dataTypeDescriptors, variables, dataTypeName, binding) {
  return isCompatibleWithType(dataTypeDescriptors, variables, { name: dataTypeName }, binding);
});

var getParent = exports.getParent = function getParent(_ref) {
  var expression = _ref.expression;

  if (!expression || !(0, _expressions.isNested)(expression)) {
    return null;
  }

  return {
    expression: expression.substring(0, expression.lastIndexOf('.'))
  };
};

var getRoot = exports.getRoot = function getRoot(binding) {
  var expression = binding.expression;

  if (!expression || !(0, _expressions.isNested)(expression)) {
    return binding;
  }

  return {
    expression: expression.substring(0, expression.indexOf('.'))
  };
};

/**
 * Returns true if the root type of the variable satisfies the given function.
 */
var rootSatisfies = exports.rootSatisfies = (0, _lodash.curry)(function (checkFn, binding) {
  var parent = getRoot(binding);
  return !!parent && checkFn(parent);
});

/**
 * Returns true if 
 * - the expression is not nested
 * - the expressions parent satisfies the given function
 */
var parentSatisfies = exports.parentSatisfies = (0, _lodash.curry)(function (checkFn, binding) {
  var parent = getParent(binding);
  return !parent || checkFn(parent);
});

var isOneOfFieldsOfParentWithType = exports.isOneOfFieldsOfParentWithType = (0, _lodash.curry)(function (dataTypeDescriptors, variables, dataType, fieldNames, binding) {
  var parent = getParent(binding);
  if (!parent) {
    return false;
  }
  var expression = binding.expression;


  var lastField = expression.substring(expression.lastIndexOf('.') + 1);
  if (fieldNames && !(0, _lodash.includes)(fieldNames, lastField)) {
    return false;
  }

  return isCompatibleWithType(dataTypeDescriptors, variables, dataType, parent);
});

var hasShowComponentSupport = exports.hasShowComponentSupport = (0, _lodash.curry)(function (dataTypeDescriptors, variables, binding) {
  var type = (0, _utils.getType)(dataTypeDescriptors, variables, binding);
  return (typeComponents[type.name] && typeComponents[type.name].Show) !== undefined;
});

var isNestedConnectorTypeDeeperThanOne = exports.isNestedConnectorTypeDeeperThanOne = (0, _lodash.curry)(function (dataTypeDescriptors, variables, _ref2) {
  var expression = _ref2.expression;

  var variable = (0, _expressions.getVariable)(variables, expression);
  var isConnectorType = (0, _dataTypes.isSingleOrListOf)(variable.type, 'connectorReference');
  return isConnectorType && expression.indexOf('.') > -1;
});


// WEBPACK FOOTER //
// ./packages/fields/lib/bindings/filter.js