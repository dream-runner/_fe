'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _isList = require('./isList');

var _isList2 = _interopRequireDefault(_isList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertsTo = (0, _lodash.curry)(function (toDataType, dataType) {
  if (!toDataType || !dataType) {
    return false;
  }

  if ((0, _isList2.default)(dataType) && !(0, _isList2.default)(toDataType)) {
    return false;
  }

  var elDataType = (0, _isList2.default)(dataType) ? dataType.elementType : dataType;
  var elToDataType = (0, _isList2.default)(toDataType) ? toDataType.elementType : toDataType;

  if ((0, _isList2.default)(toDataType) && !elToDataType) {
    // we can always convert to untyped lists
    return true;
  }

  return elDataType.name === elToDataType.name;
});

exports.default = convertsTo;


// WEBPACK FOOTER //
// ./packages/fields/lib/dataTypes/convertsTo.js