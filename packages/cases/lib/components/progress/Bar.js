'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Bar(_ref) {
  var title = _ref.title,
      popover = _ref.popover,
      children = _ref.children,
      style = _ref.style,
      fromRight = _ref.fromRight;

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      _components.Popover,
      {
        small: true,
        title: title,
        dx: fromRight ? -TEXT_OFFSET : TEXT_OFFSET,
        placement: fromRight ? 'left' : 'right',
        popover: popover
      },
      _react2.default.createElement(
        'div',
        style('bar'),
        _react2.default.createElement(
          'span',
          style('info'),
          children
        )
      )
    )
  );
}

var TEXT_OFFSET = 20;

var styled = (0, _styles.defaultStyle)(function (theme, _ref2) {
  var value = _ref2.value,
      scale = _ref2.scale;
  return {
    position: 'relative',

    height: theme.padding.xsmall + 2,
    minWidth: theme.padding.xsmall,

    bar: (0, _extends3.default)({
      position: 'absolute',
      width: 'calc((100% - ' + TEXT_OFFSET + 'px) * ' + value / scale + ')',

      top: 0,
      left: 0,

      height: theme.padding.xsmall + 2,

      backgroundColor: (0, _color2.default)(theme.color.mono.lighter).fade(0.3).string()

    }, _styles.utils.border('1px', 'solid', theme.color.mono.lighter), _styles.utils.transition('width')),

    info: {
      position: 'absolute',

      top: -6,
      right: -TEXT_OFFSET,

      fontSize: _styles.font.size.small
    },

    '&fromRight': {
      bar: {
        right: 0,
        left: null
      },

      info: {
        right: null,
        left: -TEXT_OFFSET
      }
    }
  };
}, function (props) {
  return {
    '&fromRight': props.fromRight
  };
});

exports.default = styled(Bar);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/progress/Bar.js