'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResolveDataTypeName = exports.getResolveDataType = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _recompose = require('recompose');

var _dataTypes = require('./dataTypes');

var _components = require('./components');

var _expressions = require('./expressions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getResolveDataType = (0, _recompose.compose)(_components.getFieldsContext, (0, _recompose.mapProps)(function (_ref) {
  var dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['dataTypeDescriptors', 'variables']);
  return (0, _extends3.default)({}, rest, {
    resolveDataType: function resolveDataType(expression) {
      return (0, _expressions.resolveType)(dataTypeDescriptors, variables, expression);
    }
  });
}));

exports.getResolveDataType = getResolveDataType;
var getResolveDataTypeName = (0, _recompose.compose)(_components.getFieldsContext, (0, _recompose.mapProps)(function (_ref2) {
  var dataTypeDescriptors = _ref2.dataTypeDescriptors,
      variables = _ref2.variables,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['dataTypeDescriptors', 'variables']);
  return (0, _extends3.default)({}, rest, {
    resolveDataTypeName: function resolveDataTypeName(expression, plural) {
      var dataType = (0, _expressions.resolveType)(dataTypeDescriptors, variables, expression);

      return (0, _dataTypes.getDataTypeName)(dataTypeDescriptors, dataType, plural);
    }
  });
}));
exports.getResolveDataTypeName = getResolveDataTypeName;


// WEBPACK FOOTER //
// ./packages/fields/lib/higherOrder.js