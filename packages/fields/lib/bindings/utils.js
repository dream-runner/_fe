'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasStaticTypeWithName = exports.findDescriptorForType = exports.equals = exports.matchBindables = exports.isEmpty = exports.isStatic = exports.highlightMatchName = exports.unfoldBindables = exports.getType = undefined;

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _lodash = require('lodash');

var _expressions = require('../expressions');

var _dataTypes = require('../dataTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getType = exports.getType = (0, _lodash.curry)(function (dataTypeDescriptors, variables, binding) {
  if (!binding) {
    return null;
  }

  if (binding.type) {
    return binding.type;
  }

  if (binding.expression) {
    return (0, _expressions.resolveType)(dataTypeDescriptors, variables, binding.expression);
  }

  return null;
});

var unfoldBindablesSingleVar = (0, _lodash.curry)(function (dataTypeDescriptors, variable) {
  return (0, _dataTypes.unfoldFields)(dataTypeDescriptors, variable.type).map(function (_ref) {
    var fields = _ref.fields;
    return {
      expression: [variable.id].concat(fields).join('.')
    };
  });
});

var unfoldBindables = exports.unfoldBindables = (0, _lodash.curry)(function (dataTypeDescriptors) {
  var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  variables = (0, _lodash.isArray)(variables) ? variables : [variables];
  return (0, _lodash.flatten)(variables.map(unfoldBindablesSingleVar(dataTypeDescriptors)));
});

var matchName = (0, _lodash.curry)(function (name, query) {
  name = name.toLowerCase();
  query = query.toLowerCase();

  return name.indexOf(query) >= 0 || name.split(' / ').map(function (part, i) {
    return part[0] === query[i];
  });
});

var highlightMatchName = exports.highlightMatchName = function highlightMatchName(name, query, highlightFn) {
  if (!query) return [name];

  query = query.toLowerCase();
  var index = name.toLowerCase().indexOf(query);

  return index >= 0 ? [name.substring(0, index), highlightFn(name.substr(index, query.length)), name.substring(index + query.length)] : (0, _lodash.compact)((0, _lodash.flatten)(name.split(' / ').map(function (part, i) {
    var _part = (0, _toArray3.default)(part),
        firstChar = _part[0],
        rest = _part.slice(1);

    return firstChar.toLowerCase() === query[i] ? [i > 0 && ' / ', highlightFn(firstChar), rest.join('')] : [i > 0 && ' / ', part];
  })));
};

var isStatic = exports.isStatic = function isStatic(_ref2) {
  var expression = _ref2.expression;
  return !expression;
};

var isEmpty = exports.isEmpty = function isEmpty(_ref3) {
  var expression = _ref3.expression,
      value = _ref3.value,
      template = _ref3.template;
  return !expression && !value && !template;
};

var matchBindables = exports.matchBindables = (0, _lodash.curry)(function (dataTypeDescriptors, variables, bindables, search) {
  return (0, _lodash.filter)(bindables, function (_ref4) {
    var expression = _ref4.expression;
    return matchName((0, _expressions.resolveName)(dataTypeDescriptors, variables, expression), search);
  });
});

var equals = exports.equals = (0, _lodash.curry)(function (binding1, binding2) {
  return isStatic(binding1) ? isStatic(binding2) && binding1.type === binding2.type && binding1.value === binding2.value : binding1.expression === binding2.expression && binding1.transform === binding2.transform;
});

var findDescriptorForType = exports.findDescriptorForType = (0, _lodash.curry)(function (dataTypeDescriptors, type) {
  if (!type) {
    throw new Error('Cannot find descriptor without type.');
  }

  return (0, _lodash.find)(dataTypeDescriptors, function (_ref5) {
    var key = _ref5.key;
    return key === type.name;
  });
});

var hasStaticTypeWithName = exports.hasStaticTypeWithName = function hasStaticTypeWithName(_ref6, typeName) {
  var type = _ref6.type;
  return !!type && type.name === typeName;
};


// WEBPACK FOOTER //
// ./packages/fields/lib/bindings/utils.js