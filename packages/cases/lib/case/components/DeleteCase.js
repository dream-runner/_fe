'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeleteCase(_ref) {
  var cascadeDelete = _ref.cascadeDelete,
      confirmDelete = _ref.confirmDelete,
      small = _ref.small,
      onRequestDelete = _ref.onRequestDelete,
      onCancelDelete = _ref.onCancelDelete,
      onConfirmDelete = _ref.onConfirmDelete,
      onChangeCascade = _ref.onChangeCascade;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _buttons.IconButton,
      {
        block: true,
        light: true,
        small: small,
        icon: 'trash',
        onClick: onRequestDelete
      },
      (0, _signavioI18n2.default)('Delete case')
    ),
    confirmDelete && _react2.default.createElement(
      _components.Confirm,
      {
        danger: true,
        title: (0, _signavioI18n2.default)('Delete this case?'),
        onCancel: onCancelDelete,
        onConfirm: onConfirmDelete
      },
      _react2.default.createElement(
        _hints.Hint,
        { warning: true },
        _react2.default.createElement(_effektifFields.Field, {
          regularBoolean: true,
          label: (0, _signavioI18n2.default)('Delete all sub-cases'),
          type: _effektifFields.booleanType,
          value: cascadeDelete,
          onChange: onChangeCascade
        })
      ),
      _react2.default.createElement(
        _hints.Hint,
        null,
        (0, _signavioI18n2.default)('Are you sure you want to delete this case? This action cannot be undone.')
      )
    )
  );
}
exports.default = (0, _recompose.compose)((0, _recompose.withState)('confirmDelete', 'toggleConfirm', false), (0, _recompose.withState)('cascadeDelete', 'setCascadeDelete', false), (0, _recompose.withHandlers)({
  onRequestDelete: function onRequestDelete(_ref2) {
    var toggleConfirm = _ref2.toggleConfirm;
    return function () {
      return toggleConfirm(true);
    };
  },
  onCancelDelete: function onCancelDelete(_ref3) {
    var toggleConfirm = _ref3.toggleConfirm;
    return function () {
      return toggleConfirm(false);
    };
  },
  onConfirmDelete: function onConfirmDelete(_ref4) {
    var cascadeDelete = _ref4.cascadeDelete,
        onDelete = _ref4.onDelete;
    return function () {
      return onDelete(cascadeDelete);
    };
  },
  onChangeCascade: function onChangeCascade(_ref5) {
    var setCascadeDelete = _ref5.setCascadeDelete;
    return function (value) {
      return setCascadeDelete(value);
    };
  }
}))(DeleteCase);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/DeleteCase.js