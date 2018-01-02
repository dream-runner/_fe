'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.findField = findField;
exports.findButtonsField = findButtonsField;
exports.findFieldPosition = findFieldPosition;
exports.addField = addField;
exports.removeField = removeField;
exports.replaceField = replaceField;

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findField(fieldDefinitions, id) {
  return (0, _lodash.find)(fieldDefinitions, { id: id });
}
function findButtonsField(fieldDefinitions) {
  return (0, _lodash.find)(fieldDefinitions, 'asButtons');
}

function findFieldPosition(fieldDefinitions, id) {
  return (0, _lodash.findIndex)(fieldDefinitions, { id: id });
}

function addField(fieldDefinitions, fieldDefinition, position) {
  var newPosition = (0, _lodash.isNumber)(position) && position < fieldDefinitions.length ? position : fieldDefinitions.length;

  return [].concat((0, _toConsumableArray3.default)(fieldDefinitions.slice(0, newPosition)), [fieldDefinition], (0, _toConsumableArray3.default)(fieldDefinitions.slice(newPosition + 1)));
}

function removeField(fieldDefinitions, id) {
  var position = findFieldPosition(fieldDefinitions, id);

  if (position === -1) {
    return fieldDefinitions;
  }

  return [].concat((0, _toConsumableArray3.default)(fieldDefinitions.slice(0, position)), (0, _toConsumableArray3.default)(fieldDefinitions.slice(position + 1)));
}

function replaceField(fieldDefinitions, newFieldDefinition) {
  var position = findFieldPosition(fieldDefinitions, newFieldDefinition.id);

  if (position === -1) {
    return fieldDefinitions;
  }

  return [].concat((0, _toConsumableArray3.default)(fieldDefinitions.slice(0, position)), [newFieldDefinition], (0, _toConsumableArray3.default)(fieldDefinitions.slice(position + 1)));
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/utils/fieldUtils.js