'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicableOperators = undefined;
exports.isValid = isValid;

var _operators = require('../operators');

var _operators2 = _interopRequireDefault(_operators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValid(condition) {
  var type = condition.type,
      left = condition.left,
      right = condition.right,
      conditions = condition.conditions;


  if (!type) return false;

  if ((0, _operators.isNAry)(type)) return !!conditions;

  if (!left || !left.expression) return false;

  if ((0, _operators.isUnary)(type)) return true;

  // it's a binary condition

  if (!right) return false;

  if (!right.expression && (right.value === undefined || right.value === null)) return false;

  return true;
}

var applicableOperators = exports.applicableOperators = function applicableOperators(leftType, rightType) {
  return Object.keys(_operators2.default).filter(function (operatorType) {
    return (0, _operators.isApplicable)(operatorType, leftType, rightType);
  });
};


// WEBPACK FOOTER //
// ./packages/conditions/lib/utils/index.js