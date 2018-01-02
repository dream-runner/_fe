'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _utils = require('@signavio/effektif-commons/lib/utils');

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CloseCase(_ref) {
  var reason = _ref.reason,
      confirmClose = _ref.confirmClose,
      small = _ref.small,
      onKeyDown = _ref.onKeyDown,
      onRequestClose = _ref.onRequestClose,
      onCancelClose = _ref.onCancelClose,
      onConfirmClose = _ref.onConfirmClose,
      onChangeReason = _ref.onChangeReason;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _buttons.IconButton,
      {
        block: true,
        light: true,
        small: small,
        icon: 'cancel',
        onClick: onRequestClose
      },
      (0, _signavioI18n2.default)('Close this case')
    ),
    confirmClose && _react2.default.createElement(
      _components.Confirm,
      {
        danger: true,
        title: (0, _signavioI18n2.default)('Close this case?'),
        onCancel: onCancelClose,
        onConfirm: onConfirmClose,
        disabled: !reason
      },
      _react2.default.createElement(
        _hints.Hint,
        { warning: true },
        (0, _signavioI18n2.default)('Are you sure you want to close this case? This action cannot be undone.')
      ),
      _react2.default.createElement(_effektifFields.Field, {
        noClear: true,
        type: (0, _effektifFields.textType)(),
        value: reason,
        placeholder: (0, _signavioI18n2.default)('Please enter the reason for closing this case'),
        onKeyDown: onKeyDown,
        onChange: onChangeReason
      })
    )
  );
}

exports.default = (0, _recompose.compose)((0, _recompose.withState)('confirmClose', 'toggleConfirm', false), (0, _recompose.withState)('reason', 'setReason', ''), (0, _recompose.withHandlers)({
  onRequestClose: function onRequestClose(_ref2) {
    var toggleConfirm = _ref2.toggleConfirm;
    return function () {
      return toggleConfirm(true);
    };
  },
  onCancelClose: function onCancelClose(_ref3) {
    var toggleConfirm = _ref3.toggleConfirm;
    return function () {
      return toggleConfirm(false);
    };
  },
  onConfirmClose: function onConfirmClose(_ref4) {
    var reason = _ref4.reason,
        toggleConfirm = _ref4.toggleConfirm,
        onClose = _ref4.onClose;
    return function () {
      toggleConfirm(false);
      onClose(reason);
    };
  },
  onChangeReason: function onChangeReason(_ref5) {
    var setReason = _ref5.setReason;
    return function (value) {
      return setReason(value);
    };
  },
  onKeyDown: function onKeyDown(_ref6) {
    var reason = _ref6.reason,
        toggleConfirm = _ref6.toggleConfirm,
        onClose = _ref6.onClose;
    return function (event) {
      if (_utils.KeyUtils.isEnter(event) && reason) {
        toggleConfirm(false);
        onClose(reason);
      }
    };
  }
}))(CloseCase);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/CloseCase.js