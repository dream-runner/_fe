'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.someEqual = exports.allEqual = exports.isFuture = exports.isPast = exports.isNow = exports.isOnOrBefore = exports.isBefore = exports.isOnOrAfter = exports.isAfter = exports.notContainsIgnoreCase = exports.containsIgnoreCase = exports.notContains = exports.contains = exports.hasNoValue = exports.hasValue = exports.isFalse = exports.isTrue = exports.lessThanOrEqual = exports.lessThan = exports.greaterThanOrEqual = exports.greaterThan = exports.notEquals = exports.equals = exports.or = exports.and = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifFields = require('@signavio/effektif-fields');

var _fpLogic = require('@signavio/effektif-commons/lib/utils/fpLogic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isList = _effektifFields.dataTypeUtils.isList,
    isNumber = _effektifFields.dataTypeUtils.isNumber,
    isText = _effektifFields.dataTypeUtils.isText,
    isEmailAddress = _effektifFields.dataTypeUtils.isEmailAddress,
    isBoolean = _effektifFields.dataTypeUtils.isBoolean,
    isDate = _effektifFields.dataTypeUtils.isDate,
    isDuration = _effektifFields.dataTypeUtils.isDuration;


var sameAsLeft = function sameAsLeft(leftType) {
  return leftType;
};
var anyType = function anyType(type) {
  return true;
};

var and = exports.and = {
  name: function name() {
    return (0, _signavioI18n2.default)('if all of the following conditions are met');
  },
  keywords: function keywords() {
    return [(0, _signavioI18n2.default)('and'), '&&'];
  }
};
var or = exports.or = {
  name: function name() {
    return (0, _signavioI18n2.default)('if at least one of the following conditions is met');
  },
  keywords: function keywords() {
    return [(0, _signavioI18n2.default)('or'), '||'];
  }
};

var equals = exports.equals = {
  name: function name(leftType) {
    return leftType && isNumber(leftType) ? '=' : (0, _signavioI18n2.default)('equals');
  },
  keywords: function keywords() {
    return [(0, _signavioI18n2.default)('equals'), '='];
  },
  isApplicableLeft: function isApplicableLeft(leftType) {
    return !isList(leftType) && leftType.name !== 'boolean';
  },
  getApplicableRight: sameAsLeft
};

var notEquals = exports.notEquals = (0, _extends3.default)({}, equals, {
  name: function name(leftType) {
    return isNumber(leftType) ? '≠' : (0, _signavioI18n2.default)('does not equal');
  },
  keywords: function keywords() {
    return [(0, _signavioI18n2.default)('is not equal to'), '!='];
  }
});

var greaterThan = exports.greaterThan = {
  name: function name() {
    return '>';
  },
  keywords: function keywords() {
    return [(0, _signavioI18n2.default)('greater than')];
  },
  isApplicableLeft: (0, _fpLogic.passesSome)(isNumber, isDuration),
  getApplicableRight: sameAsLeft
};

var greaterThanOrEqual = exports.greaterThanOrEqual = {
  name: function name() {
    return '≥';
  },
  keywords: function keywords() {
    return [(0, _signavioI18n2.default)('greater than or equal to'), '>='];
  },
  isApplicableLeft: (0, _fpLogic.passesSome)(isNumber, isDuration),
  getApplicableRight: sameAsLeft
};

var lessThan = exports.lessThan = {
  name: function name() {
    return '<';
  },
  keywords: function keywords() {
    return [(0, _signavioI18n2.default)('less than')];
  },
  isApplicableLeft: (0, _fpLogic.passesSome)(isNumber, isDuration),
  getApplicableRight: sameAsLeft
};

var lessThanOrEqual = exports.lessThanOrEqual = {
  name: function name() {
    return '≤';
  },
  keywords: function keywords() {
    return [(0, _signavioI18n2.default)('less than or equal to'), '<='];
  },
  isApplicableLeft: (0, _fpLogic.passesSome)(isNumber, isDuration),
  getApplicableRight: sameAsLeft
};

var isTrue = exports.isTrue = {
  name: function name() {
    return (0, _signavioI18n2.default)('is set to `YES`');
  },
  keywords: function keywords() {
    return ['true'];
  },
  isApplicableLeft: isBoolean
};

var isFalse = exports.isFalse = {
  name: function name() {
    return (0, _signavioI18n2.default)('is set to `NO`');
  },
  keywords: function keywords() {
    return ['false'];
  },
  isApplicableLeft: isBoolean
};

var hasValue = exports.hasValue = {
  name: function name() {
    return (0, _signavioI18n2.default)('has a value');
  },
  isApplicableLeft: anyType
};

var hasNoValue = exports.hasNoValue = {
  name: function name() {
    return (0, _signavioI18n2.default)('does not have a value');
  },
  isApplicableLeft: anyType
};

var contains = exports.contains = {
  name: function name() {
    return (0, _signavioI18n2.default)('contains');
  },
  isApplicableLeft: (0, _fpLogic.passesSome)(isText, isEmailAddress),
  getApplicableRight: function getApplicableRight() {
    return { name: 'text' };
  }
};

var notContains = exports.notContains = {
  name: function name() {
    return (0, _signavioI18n2.default)('does not contain');
  },
  isApplicableLeft: (0, _fpLogic.passesSome)(isText, isEmailAddress),
  getApplicableRight: function getApplicableRight() {
    return { name: 'text' };
  }
};

var containsIgnoreCase = exports.containsIgnoreCase = {
  name: function name() {
    return (0, _signavioI18n2.default)('contains (ignore case)');
  },
  isApplicableLeft: isText,
  getApplicableRight: function getApplicableRight() {
    return { name: 'text' };
  }
};

var notContainsIgnoreCase = exports.notContainsIgnoreCase = {
  name: function name() {
    return (0, _signavioI18n2.default)('does not contain (ignore case)');
  },
  isApplicableLeft: isText,
  getApplicableRight: function getApplicableRight() {
    return { name: 'text' };
  }
};

var isAfter = exports.isAfter = {
  name: function name() {
    return (0, _signavioI18n2.default)('is after');
  },
  keywords: function keywords() {
    return ['>'];
  },
  isApplicableLeft: isDate,
  getApplicableRight: sameAsLeft
};

var isOnOrAfter = exports.isOnOrAfter = {
  name: function name() {
    return (0, _signavioI18n2.default)('is on or after');
  },
  keywords: function keywords() {
    return ['>='];
  },
  isApplicableLeft: isDate,
  getApplicableRight: sameAsLeft
};

var isBefore = exports.isBefore = {
  name: function name() {
    return (0, _signavioI18n2.default)('is before');
  },
  keywords: function keywords() {
    return ['<'];
  },
  isApplicableLeft: isDate,
  getApplicableRight: sameAsLeft
};

var isOnOrBefore = exports.isOnOrBefore = {
  name: function name() {
    return (0, _signavioI18n2.default)('is on or before');
  },
  keywords: function keywords() {
    return ['<='];
  },
  isApplicableLeft: isDate,
  getApplicableRight: sameAsLeft
};

var isNow = exports.isNow = {
  name: function name() {
    return (0, _signavioI18n2.default)('is now');
  },
  isApplicableLeft: isDate
};

var isPast = exports.isPast = {
  name: function name() {
    return (0, _signavioI18n2.default)('is in the past');
  },
  isApplicableLeft: isDate
};

var isFuture = exports.isFuture = {
  name: function name() {
    return (0, _signavioI18n2.default)('is in the future');
  },
  isApplicableLeft: isDate
};

var allEqual = exports.allEqual = {
  name: function name() {
    return (0, _signavioI18n2.default)('all items equal');
  },
  isApplicableLeft: isList,
  getApplicableRight: function getApplicableRight(leftType) {
    return leftType.elementType;
  }
};

var someEqual = exports.someEqual = {
  name: function name() {
    return (0, _signavioI18n2.default)('contains at least one');
  },
  isApplicableLeft: isList,
  getApplicableRight: function getApplicableRight(leftType) {
    return leftType.elementType;
  }
};


// WEBPACK FOOTER //
// ./packages/conditions/lib/operators/operators/index.js