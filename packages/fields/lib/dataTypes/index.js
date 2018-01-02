'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDefaults = exports.getDataTypeName = exports.unfoldFields = exports.isPrimitive = exports.getIcon = exports.isChoice = exports.isDuration = exports.isDate = exports.isBoolean = exports.isNumber = exports.isEmailAddress = exports.isText = exports.isSingleOrListOf = exports.getDescriptor = exports.convertsTo = exports.baseConfigs = exports.isList = undefined;

var _lodash = require('lodash');

var _getDefaultDataTypeDescriptors = require('./getDefaultDataTypeDescriptors');

var _getDefaultDataTypeDescriptors2 = _interopRequireDefault(_getDefaultDataTypeDescriptors);

var _isList2 = require('./isList');

var _isList3 = _interopRequireDefault(_isList2);

var _getDescriptor4 = require('./getDescriptor');

var _getDescriptor5 = _interopRequireDefault(_getDescriptor4);

var _baseConfigs2 = require('./baseConfigs');

var _baseConfigs3 = _interopRequireDefault(_baseConfigs2);

var _convertsTo2 = require('./convertsTo');

var _convertsTo3 = _interopRequireDefault(_convertsTo2);

var _isSingleOrListOf2 = require('./isSingleOrListOf');

var _isSingleOrListOf3 = _interopRequireDefault(_isSingleOrListOf2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.isList = _isList3.default;
exports.baseConfigs = _baseConfigs3.default;
exports.convertsTo = _convertsTo3.default;
exports.getDescriptor = _getDescriptor5.default;
exports.isSingleOrListOf = _isSingleOrListOf3.default;
var isText = exports.isText = function isText(dataType) {
  return dataType.name === 'text';
};
var isEmailAddress = exports.isEmailAddress = function isEmailAddress(dataType) {
  return dataType.name === 'emailAddress';
};
var isNumber = exports.isNumber = function isNumber(dataType) {
  return dataType.name === 'number';
};
var isBoolean = exports.isBoolean = function isBoolean(dataType) {
  return dataType.name === 'boolean';
};
var isDate = exports.isDate = function isDate(dataType) {
  return dataType.name === 'date';
};
var isDuration = exports.isDuration = function isDuration(dataType) {
  return dataType.name === 'duration';
};
var isChoice = exports.isChoice = function isChoice(dataType) {
  return dataType.name === 'choice';
};

var defaultIcon = '';
var getIcon = exports.getIcon = (0, _lodash.curry)(function (dataTypeDescriptors, dataType) {
  var typeForIcon = (0, _isList3.default)(dataType) ? dataType.elementType : dataType;
  var descriptor = (0, _getDescriptor5.default)(dataTypeDescriptors, typeForIcon);
  return descriptor.icon || defaultIcon;
});

var isPrimitive = exports.isPrimitive = (0, _lodash.curry)(function (dataTypeDescriptors, dataType) {
  var descriptor = (0, _getDescriptor5.default)(dataTypeDescriptors, (0, _isList3.default)(dataType) ? dataType.elementType : dataType);
  return (0, _lodash.isEmpty)(descriptor.fields);
});

var unfoldFields = exports.unfoldFields = (0, _lodash.curry)(function (dataTypeDescriptors, dataType) {
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var result = [{ fields: path, type: dataType }];

  var _getDescriptor2 = (0, _getDescriptor5.default)(dataTypeDescriptors, dataType),
      fields = _getDescriptor2.fields;

  if (fields) {
    fields.forEach(function (field) {
      result = result.concat(unfoldFields(dataTypeDescriptors, field.type, path.concat(field.key)));
    });
  }

  return result;
});

var getDataTypeName = exports.getDataTypeName = (0, _lodash.curry)(function (dataTypeDescriptors, dataType) {
  var plural = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var _getDescriptor3 = (0, _getDescriptor5.default)(dataTypeDescriptors, dataType),
      name = _getDescriptor3.name,
      namePlural = _getDescriptor3.namePlural;

  return plural && namePlural ? namePlural : name;
});

var initDefaults = exports.initDefaults = function initDefaults() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var defaults = (0, _getDefaultDataTypeDescriptors2.default)();

  var valueKeys = value.map(function (_ref) {
    var key = _ref.key;
    return key;
  });

  var extras = (0, _lodash.filter)(defaults, function (_ref2) {
    var key = _ref2.key;
    return !(0, _lodash.includes)(valueKeys, key);
  });

  value.forEach(function (item) {
    var defaultValue = findByKey(defaults, item.key);
    (0, _lodash.merge)(item, defaultValue);
  });

  return value.concat(extras);
};

var findByKey = function findByKey(defaults, key) {
  return defaults.find(function (item) {
    return item.key === key;
  });
};


// WEBPACK FOOTER //
// ./packages/fields/lib/dataTypes/index.js