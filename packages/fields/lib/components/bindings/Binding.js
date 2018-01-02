'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = Binding;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Edit = require('./Edit');

var _Edit2 = _interopRequireDefault(_Edit);

var _Show = require('./Show');

var _Show2 = _interopRequireDefault(_Show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Binding(_ref) {
  var readOnly = _ref.readOnly,
      labelId = _ref.labelId,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['readOnly', 'labelId']);

  var Component = readOnly ? _Show2.default : _Edit2.default;

  return _react2.default.createElement(Component, (0, _extends3.default)({ id: labelId }, rest));
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/Binding.js