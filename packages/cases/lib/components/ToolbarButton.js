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

function ToolbarButton(_ref) {
  var active = _ref.active,
      children = _ref.children,
      icon = _ref.icon,
      style = _ref.style,
      onClick = _ref.onClick;

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      _components.Popover,
      { small: true, popover: children },
      _react2.default.createElement(_buttons.IconButton, {
        light: true,
        style: style('icon'),
        primary: active,
        icon: icon,
        onClick: onClick
      })
    )
  );
}
exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onClick: function (_onClick) {
    function onClick(_x) {
      return _onClick.apply(this, arguments);
    }

    onClick.toString = function () {
      return _onClick.toString();
    };

    return onClick;
  }(function (_ref2) {
    var item = _ref2.item,
        onClick = _ref2.onClick;
    return function () {
      if (onClick) {
        onClick(item);
      }
    };
  })
}), (0, _styles.defaultStyle)({
  icon: {
    borderRadius: 40
  }
}))(ToolbarButton);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/ToolbarButton.js