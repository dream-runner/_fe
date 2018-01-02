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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('./hints');

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _buttons = require('./buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hint = function Hint(props) {
  var modal = props.modal,
      buttons = props.buttons,
      title = props.title,
      onRequestHide = props.onRequestHide,
      onDismiss = props.onDismiss,
      className = props.className,
      rest = (0, _objectWithoutProperties3.default)(props, ['modal', 'buttons', 'title', 'onRequestHide', 'onDismiss', 'className']);


  if (modal) {
    return _react2.default.createElement(
      _modal2.default,
      {
        onRequestHide: onRequestHide,
        title: title,
        className: className,
        footer: buttons || onDismiss && _react2.default.createElement(
          _buttons.TextButton,
          { primary: true, block: true, onClick: onRequestHide },
          (0, _signavioI18n2.default)('Ok')
        )
      },
      _react2.default.createElement(InnerHint, (0, _extends3.default)({ className: className }, rest))
    );
  }

  return _react2.default.createElement(InnerHint, (0, _extends3.default)({ className: className }, rest));
};

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onRequestHide: function onRequestHide(_ref) {
    var onDismiss = _ref.onDismiss;
    return function () {
      if (onDismiss) {
        onDismiss();
      }
    };
  }
}))(Hint);


var InnerHint = function InnerHint(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['children', 'className']);
  return _react2.default.createElement(
    _hints.Hint,
    (0, _extends3.default)({ className: 'hint ' + (className || '') }, rest),
    children
  );
};


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Hint.js