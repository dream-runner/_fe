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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('../styles');

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _buttons = require('./buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Confirm(_ref) {
  var children = _ref.children,
      danger = _ref.danger,
      disabled = _ref.disabled,
      cancelText = _ref.cancelText,
      confirmText = _ref.confirmText,
      style = _ref.style,
      onCancel = _ref.onCancel,
      onConfirm = _ref.onConfirm,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'danger', 'disabled', 'cancelText', 'confirmText', 'style', 'onCancel', 'onConfirm']);

  return _react2.default.createElement(
    _modal2.default,
    (0, _extends3.default)({}, rest, style, {
      danger: danger,
      onRequestHide: onCancel,
      footer: _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _buttons.TextButton,
          { style: style('cancel'), onClick: onCancel },
          cancelText || (0, _signavioI18n2.default)('Cancel')
        ),
        _react2.default.createElement(
          _buttons.TextButton,
          {
            style: style('confirm'),
            danger: danger,
            primary: !danger,
            disabled: disabled,
            onClick: onConfirm
          },
          confirmText || (0, _signavioI18n2.default)('Ok')
        )
      )
    }),
    children
  );
}


var styled = (0, _styles.defaultStyle)({
  cancel: {
    width: '50%'
  },

  confirm: {
    width: 'calc(50% - 1px)',
    marginLeft: 1
  }
});

exports.default = styled(Confirm);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Confirm.js