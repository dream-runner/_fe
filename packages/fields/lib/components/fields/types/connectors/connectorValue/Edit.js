'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _reactForms = require('@signavio/react-forms');

var _higherOrder = require('../../../higher-order');

var _components = require('../components');

var _Show = require('./Show');

var _Show2 = _interopRequireDefault(_Show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EditConnectorValue(_ref) {
  var value = _ref.value,
      type = _ref.type,
      onChange = _ref.onChange;

  return _react2.default.createElement(_components.OptionSelect, {
    type: type,
    value: value && value.id,
    onChange: onChange,
    valueDisplay: _react2.default.createElement(_Show2.default, { type: type, value: value, transparent: true })
  });
}

exports.default = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnChange, (0, _higherOrder.createClearable)({ triggerOnComplete: false }))(EditConnectorValue);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/connectors/connectorValue/Edit.js