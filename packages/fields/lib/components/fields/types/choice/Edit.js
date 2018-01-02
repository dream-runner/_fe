'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactForms = require('@signavio/react-forms');

var _OptionSelect = require('./OptionSelect');

var _OptionSelect2 = _interopRequireDefault(_OptionSelect);

var _ButtonSelect = require('./ButtonSelect');

var _ButtonSelect2 = _interopRequireDefault(_ButtonSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Edit(_ref) {
  var asButtons = _ref.asButtons,
      name = _ref.name,
      value = _ref.value,
      noClear = _ref.noClear,
      disabled = _ref.disabled,
      inactive = _ref.inactive,
      _ref$type$options = _ref.type.options,
      options = _ref$type$options === undefined ? [] : _ref$type$options,
      onChange = _ref.onChange,
      placeholder = _ref.placeholder;

  if (asButtons) {
    return _react2.default.createElement(_ButtonSelect2.default, {
      disabled: disabled,
      inactive: inactive,
      options: options,
      value: value,
      onSubmit: onChange,
      placeholder: name
    });
  }

  return _react2.default.createElement(_OptionSelect2.default, {
    placeholder: placeholder || name,
    options: options,
    value: value,
    onChange: onChange,
    noClear: noClear
  });
}

exports.default = (0, _reactForms.triggerOnCompleteOnChange)(Edit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/choice/Edit.js