'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ui = require('@signavio/ui');

var _styles = require('../../styles');

var _hints = require('../hints');

var _Disable = require('../Disable');

var _Disable2 = _interopRequireDefault(_Disable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SneakPeek(_ref) {
  var children = _ref.children,
      hint = _ref.hint,
      tooltip = _ref.tooltip,
      tooltipPlacement = _ref.tooltipPlacement,
      style = _ref.style;

  if (tooltip) {
    return _react2.default.createElement(
      _ui.Popover,
      {
        position: tooltipPlacement || 'top',
        popover: tooltip,
        small: true,
        style: style
      },
      _react2.default.createElement(
        _Disable2.default,
        { style: style('feature') },
        children
      )
    );
  }

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      _Disable2.default,
      { style: style('feature') },
      children
    ),
    _react2.default.createElement(
      'div',
      style('hintContainer'),
      _react2.default.createElement(
        _hints.Hint,
        { info: true, style: style('hint') },
        hint
      )
    )
  );
}

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      padding = _ref2.padding;
  return {
    position: 'relative',

    hint: (0, _extends3.default)({
      display: 'inline-block',
      marginTop: null,
      marginBottom: null,

      paddingTop: padding.normal,
      paddingLeft: padding.normal,
      paddingRight: padding.normal,
      paddingBottom: padding.large,

      backgroundColor: 'white'

    }, _styles.utils.transition('opacity'), _styles.utils.popover(color)),

    hintContainer: {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      top: '50%',
      transform: 'translateY(-50%)'
    },

    feature: (0, _extends3.default)({}, _styles.utils.grayscale())
  };
});

exports.default = styled(SneakPeek);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/features/SneakPeek.js