'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keywords = exports.name = exports.getApplicableRight = exports.isApplicable = exports.isNAry = exports.isUnary = undefined;

var _lodash = require('lodash');

var _effektifFields = require('@signavio/effektif-fields');

var _operators = require('./operators');

var operators = _interopRequireWildcard(_operators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var convertsTo = _effektifFields.dataTypeUtils.convertsTo;


// default export is only the constants ...
exports.default = (0, _lodash.mapValues)(operators, function (def, operatorType) {
  return operatorType;
});
var isUnary = exports.isUnary = function isUnary(operatorType) {
  return !operators[operatorType].getApplicableRight && !!operators[operatorType].isApplicableLeft;
};

var isNAry = exports.isNAry = function isNAry(operatorType) {
  return !operators[operatorType].isApplicableLeft;
};

var isApplicable = exports.isApplicable = function isApplicable(operatorType, leftType, rightType) {
  var _operators$operatorTy = operators[operatorType],
      isApplicableLeft = _operators$operatorTy.isApplicableLeft,
      getApplicableRight = _operators$operatorTy.getApplicableRight;

  return leftType && isApplicableLeft && isApplicableLeft(leftType) && (!rightType || getApplicableRight && convertsTo(getApplicableRight(leftType), rightType));
};

var getApplicableRight = exports.getApplicableRight = function getApplicableRight(operatorType, leftType) {
  return operators[operatorType].getApplicableRight ? operators[operatorType].getApplicableRight(leftType) : null;
};

var name = exports.name = function name(operatorType, leftType) {
  return operators[operatorType].name(leftType);
};

var keywords = exports.keywords = function keywords(operatorType) {
  return operators[operatorType].keywords && operators[operatorType].keywords();
};


// WEBPACK FOOTER //
// ./packages/conditions/lib/operators/index.js