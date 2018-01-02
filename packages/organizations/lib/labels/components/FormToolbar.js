'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LabelFormToolbar = function LabelFormToolbar(_ref) {
  var editing = _ref.editing,
      disabled = _ref.disabled,
      onCancel = _ref.onCancel,
      onSave = _ref.onSave;

  if (editing) {
    return _react2.default.createElement(
      _components.List,
      { direction: 'horizontal' },
      _react2.default.createElement(_buttons.IconButton, { primary: true, icon: 'check', onClick: onSave, disabled: disabled }),
      _react2.default.createElement(_buttons.IconButton, { icon: 'times', onClick: onCancel })
    );
  }

  return _react2.default.createElement(
    _buttons.TextButton,
    { onClick: onSave, disabled: disabled },
    (0, _signavioI18n2.default)('Create')
  );
};

exports.default = LabelFormToolbar;


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/components/FormToolbar.js