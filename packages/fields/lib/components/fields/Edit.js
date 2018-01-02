'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _reactForms = require('@signavio/react-forms');

var _wrapWithErrorBoundary = require('./higher-order/wrapWithErrorBoundary');

var _wrapWithErrorBoundary2 = _interopRequireDefault(_wrapWithErrorBoundary);

var _types = require('./types');

var typeComponents = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EditField(_ref) {
  var type = _ref.type,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['type']);

  if (!type || !type.name) {
    throw new Error('No valid data type specified');
  }

  var _ref2 = typeComponents[type.name] || {},
      Edit = _ref2.Edit;

  if (!Edit) {
    throw new Error('Could not find a component to render <EditField /> for type \'' + type.name + '\'');
  }

  return _react2.default.createElement(Edit, (0, _extends3.default)({ type: type }, rest));
}
exports.default = (0, _recompose.compose)(_wrapWithErrorBoundary2.default,
// for supporting the normal React uncontrolled behavior using `defaultValue`
(0, _reactForms.uncontrollable)({ value: 'onChange' }),
// for supporting use cases where we want to use the field in an uncontrolled fashion but actually
// still need it to respond to `value` prop updates from outside
(0, _reactForms.semicontrollable)({ value: 'onChange' }))(EditField);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/Edit.js