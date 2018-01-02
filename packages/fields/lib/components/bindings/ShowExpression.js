'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _components = require('@signavio/effektif-commons/lib/components');

var _expressions = require('../../expressions');

var _bindings = require('../../bindings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getText = function getText(elementOrString) {
  return (0, _isString2.default)(elementOrString) ? elementOrString : elementOrString.props && elementOrString.props.children;
};

var Name = function Name(_ref) {
  var dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables,
      expression = _ref.expression,
      search = _ref.search;

  var resolvedName = (0, _expressions.resolveName)(dataTypeDescriptors, variables, expression);
  var nameParts = (0, _bindings.highlightMatchName)(resolvedName, search, function (match) {
    return _react2.default.createElement(
      'strong',
      null,
      match
    );
  });

  var _expression$split = expression.split('.'),
      _expression$split2 = (0, _slicedToArray3.default)(_expression$split, 1),
      id = _expression$split2[0];

  var variable = (0, _find2.default)(variables, { id: id });
  if (!variable.name) {
    // okay, this will get complicated: in the highlighted name parts, we now have to
    // wrap the default variable name in an <Empty> component

    var index = (0, _findIndex2.default)(nameParts, function (p) {
      return getText(p).indexOf(' / ') >= 0;
    });
    if (index !== -1) {
      var breakPart = nameParts[index];
      nameParts = [].concat((0, _toConsumableArray3.default)(nameParts.slice(0, index)), [breakPart.substring(0, breakPart.indexOf(' / ')), breakPart.substring(breakPart.indexOf(' / '))], (0, _toConsumableArray3.default)(nameParts.slice(index + 1)));
      index += 1;
    } else {
      index = nameParts.length;
    }

    nameParts = [_react2.default.createElement(
      _components.Empty,
      null,
      nameParts.slice(0, index)
    ), nameParts.slice(index)];
  }

  return _react2.default.createElement(
    'span',
    null,
    nameParts
  );
};

exports.default = Name;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/ShowExpression.js