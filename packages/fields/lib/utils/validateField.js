'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = validateField;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _dataTypes = require('../dataTypes');

var _validators = require('./validators');

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkCustomValidator = function checkCustomValidator(field) {
  var validator = validators[field.type.name];

  if (validator) {
    return [].concat((0, _toConsumableArray3.default)(validator(field.value, {
      type: field.type,
      required: field.required
    })));
  }

  return [];
};

function validateField(field) {
  if (field.readOnly || !field.visible) {
    return { isValid: true };
  }

  var errors = [];

  if (field.required) {
    if ((0, _lodash.isNil)(field.value)) {
      errors = [].concat((0, _toConsumableArray3.default)(errors), [(0, _signavioI18n2.default)('This field is required')]);
    } else if ((0, _dataTypes.isList)(field.type) && (0, _lodash.isEmpty)(field.value)) {
      errors = [].concat((0, _toConsumableArray3.default)(errors), [(0, _signavioI18n2.default)('This field is required')]);
    }

    errors = [].concat((0, _toConsumableArray3.default)(errors), (0, _toConsumableArray3.default)(checkCustomValidator(field)));
  } else if (field.value) {
    errors = [].concat((0, _toConsumableArray3.default)(errors), (0, _toConsumableArray3.default)(checkCustomValidator(field)));
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}


// WEBPACK FOOTER //
// ./packages/fields/lib/utils/validateField.js