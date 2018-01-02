'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToListType = exports.convertToElementType = exports.isListType = exports.isType = exports.organizationType = exports.connectorValueType = exports.connectorReferenceType = exports.userType = exports.textType = exports.numberType = exports.moneyType = exports.listType = exports.linkType = exports.groupType = exports.fileType = exports.emailAddressType = exports.durationType = exports.dateTimeType = exports.choiceType = exports.booleanType = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var booleanType = exports.booleanType = { name: 'boolean' };
var choiceType = exports.choiceType = function choiceType(options) {
  return {
    name: 'choice',
    options: options
  };
};
var dateTimeType = exports.dateTimeType = function dateTimeType() {
  var kind = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'datetime';
  return {
    name: 'date',
    kind: kind
  };
};
var durationType = exports.durationType = { name: 'duration' };
var emailAddressType = exports.emailAddressType = { name: 'emailAddress' };
var fileType = exports.fileType = { name: 'fileId' };
var groupType = exports.groupType = { name: 'groupId' };
var linkType = exports.linkType = { name: 'link' };
var listType = exports.listType = function listType(elementType) {
  return {
    name: 'list',
    elementType: elementType
  };
};
var moneyType = exports.moneyType = { name: 'money' };
var numberType = exports.numberType = { name: 'number' };
var textType = exports.textType = function textType() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$multiLine = _ref.multiLine,
      multiLine = _ref$multiLine === undefined ? false : _ref$multiLine;

  return (0, _extends3.default)({
    name: 'text'

  }, multiLine ? { multiLine: true } : null);
};
var userType = exports.userType = { name: 'userId' };
var connectorReferenceType = exports.connectorReferenceType = function connectorReferenceType(_ref2) {
  var descriptorId = _ref2.descriptorId;
  return {
    name: 'connectorReference',
    id: descriptorId
  };
};

var connectorValueType = exports.connectorValueType = function connectorValueType(_ref3) {
  var descriptorId = _ref3.descriptorId;
  return {
    name: 'connectorValue',
    id: descriptorId
  };
};

var organizationType = exports.organizationType = { name: 'organizationId' };

var isType = exports.isType = function isType(elementType, type) {
  return elementType.name === type.name;
};

var isListType = exports.isListType = function isListType(elementType, type) {
  if (type.name !== 'list') {
    return false;
  }

  if (elementType) {
    return type.elementType && type.elementType.name === elementType.name;
  }

  return true;
};

var convertToElementType = exports.convertToElementType = function convertToElementType(variable) {
  return (0, _extends3.default)({}, variable, {
    defaultValue: variable.defaultValue ? (0, _lodash.first)(variable.defaultValue) || null : undefined,
    type: variable.type.elementType
  });
};

var convertToListType = exports.convertToListType = function convertToListType(variable) {
  return (0, _extends3.default)({}, variable, {
    defaultValue: variable.defaultValue ? [variable.defaultValue] : undefined,
    type: listType(variable.type)
  });
};


// WEBPACK FOOTER //
// ./packages/fields/lib/fieldTypes.js