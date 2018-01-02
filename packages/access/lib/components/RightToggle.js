'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RightToggle(_ref) {
  var granted = _ref.granted,
      readOnly = _ref.readOnly,
      onClick = _ref.onClick,
      style = _ref.style;

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(_buttons.IconButton, {
      block: true,
      primary: granted,
      disabled: readOnly,
      icon: granted ? 'square-check' : 'square',
      onClick: onClick
    })
  );
}
exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onClick: function onClick(_ref2) {
    var granted = _ref2.granted,
        right = _ref2.right,
        onRevoke = _ref2.onRevoke,
        onGrant = _ref2.onGrant;
    return function (ev) {
      ev.stopPropagation();
      ev.preventDefault();

      if (granted) {
        onRevoke(right);
      } else {
        onGrant(right);
      }
    };
  }
}), (0, _styles.defaultStyle)({
  display: 'block',
  float: 'left'
}), (0, _components.omitProps)(['onGrant', 'onRevoke', 'right']))(RightToggle);


// WEBPACK FOOTER //
// ./packages/access/lib/components/RightToggle.js