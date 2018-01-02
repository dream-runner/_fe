'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = BindingList;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _list = require('./list');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BindingList(_ref) {
  var readOnly = _ref.readOnly,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['readOnly']);

  var Component = readOnly ? _list.Show : _list.Edit;

  return _react2.default.createElement(Component, rest);
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/BindingList.js