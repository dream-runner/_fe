'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = LanguageSelect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _users = require('../users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LanguageSelect(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === undefined ? _users.defaultLanguageCode : _ref$value,
      onChange = _ref.onChange,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['value', 'onChange']);

  return _react2.default.createElement(_components.Select, (0, _extends3.default)({}, rest, {
    options: (0, _lodash.map)((0, _users.availableLanguages)(), function (title, id) {
      return { id: id, value: title };
    }),
    value: value,
    onChange: onChange
  }));
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/components/LanguageSelect.js