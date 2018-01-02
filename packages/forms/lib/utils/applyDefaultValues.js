'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = applyDefaultValues;

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyDefaultValues(fields, defaultValues) {
  if (!defaultValues) {
    return fields;
  }

  return (0, _lodash.reduce)(fields, function (result, field) {
    var urlValue = defaultValues[field.key || field.id];

    return [].concat((0, _toConsumableArray3.default)(result), [urlValue && (0, _lodash.isObject)(urlValue) ? (0, _extends3.default)({}, field, urlValue) : (0, _extends3.default)({}, field, {
      value: urlValue || field.value
    })]);
  }, []);
}


// WEBPACK FOOTER //
// ./packages/forms/lib/utils/applyDefaultValues.js