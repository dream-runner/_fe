'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _isList = require('./isList');

var _isList2 = _interopRequireDefault(_isList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDynamicId = function getDynamicId(key, id) {
  return (0, _lodash.compact)([key, id]).join('_');
};

var getDescriptor = (0, _lodash.curry)(function (dataTypeDescriptors, dataType) {
  var type = (0, _isList2.default)(dataType) ? dataType.elementType : dataType;

  var result = (0, _lodash.find)(dataTypeDescriptors, function (_ref) {
    var key = _ref.key,
        id = _ref.id;
    return getDynamicId(key, id) === getDynamicId(type.name, type.id);
  });

  return result;
});

exports.default = getDescriptor;


// WEBPACK FOOTER //
// ./packages/fields/lib/dataTypes/getDescriptor.js