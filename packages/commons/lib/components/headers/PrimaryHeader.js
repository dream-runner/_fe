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

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _recompose = require('recompose');

var _styles = require('../../styles');

var _ShrinkInput = require('../ShrinkInput');

var _ShrinkInput2 = _interopRequireDefault(_ShrinkInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PrimaryHeader(_ref) {
  var toolbar = _ref.toolbar,
      style = _ref.style,
      minFontSize = _ref.minFontSize,
      _ref$autoGrow = _ref.autoGrow,
      autoGrow = _ref$autoGrow === undefined ? true : _ref$autoGrow,
      onKeyDown = _ref.onKeyDown,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['toolbar', 'style', 'minFontSize', 'autoGrow', 'onKeyDown']);

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      'div',
      style('title'),
      _react2.default.createElement(
        'div',
        { className: 'primary-header' },
        _react2.default.createElement(_ShrinkInput2.default, (0, _extends3.default)({}, rest, {
          style: style('input'),
          autoGrow: autoGrow,
          minFontSize: minFontSize || parseInt(_styles.font.size.xlarge, 10),
          tabIndex: '1',
          onKeyDown: onKeyDown
        }))
      )
    ),
    toolbar
  );
}


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var padding = _ref2.padding,
      font = _ref2.font,
      color = _ref2.color;

  var backgroundColor = color.header.primary || color.primary.base;

  return (0, _extends3.default)({
    position: 'relative',

    textAlign: 'left',

    paddingTop: padding.large

  }, _styles.utils.media.print({
    title: {
      paddingLeft: 0,
      paddingTop: 0
    }
  }), {

    title: {
      position: 'relative',
      display: 'inline-block',

      textAlign: 'left',

      marginBottom: padding.xsmall,

      maxWidth: '100%',

      zIndex: 0
    },

    input: (0, _extends3.default)({
      position: 'relative',

      fontWeight: font.weight.light,
      fontFamily: font.family.heading,
      fontSize: font.size.h1,
      lineHeight: 'normal',
      color: _styles.utils.color(backgroundColor),

      paddingLeft: padding.normal,
      paddingRight: padding.normal,
      paddingTop: padding.xsmall,
      paddingBottom: padding.xsmall,

      zIndex: 1,

      backgroundColor: backgroundColor,

      outline: 'none',

      maxWidth: '100%'

    }, _styles.utils.transition('background-color'), _styles.utils.border('0px', 'solid', null), {

      '&readOnly': {
        backgroundColor: backgroundColor,
        color: _styles.utils.color(backgroundColor, color.mono.dark)
      },

      ':hover': {
        backgroundColor: (0, _color2.default)(backgroundColor).lighten(0.2).rgb().string()
      },

      ':focus': {
        backgroundColor: (0, _color2.default)(backgroundColor).lighten(0.2).rgb().string(),
        boxShadow: 'none'
      }
    }),

    '&light': {
      input: (0, _extends3.default)({
        backgroundColor: null,
        color: _styles.utils.color('white'),

        paddingLeft: padding.small,
        paddingRight: padding.small

      }, _styles.utils.borderBottom(2, 'solid', backgroundColor), {

        ':hover': {
          backgroundColor: null
        },

        ':focus': {
          backgroundColor: null
        },

        '&readOnly': (0, _extends3.default)({
          backgroundColor: null,
          color: _styles.utils.color('white')

        }, _styles.utils.borderBottom(2, 'solid', color.mono.middle))
      })
    }
  });
}, function (_ref3) {
  var readOnly = _ref3.readOnly,
      light = _ref3.light;
  return {
    '&readOnly': readOnly,
    '&light': light
  };
});

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onKeyDown: function (_onKeyDown) {
    function onKeyDown(_x) {
      return _onKeyDown.apply(this, arguments);
    }

    onKeyDown.toString = function () {
      return _onKeyDown.toString();
    };

    return onKeyDown;
  }(function (_ref4) {
    var noBlurOnEnter = _ref4.noBlurOnEnter,
        onKeyDown = _ref4.onKeyDown;
    return function (ev) {
      if (ev.keyCode === 13 && !noBlurOnEnter) {
        ev.target.blur();
      }

      if (onKeyDown) {
        onKeyDown(ev);
      }
    };
  })
}), styled)(PrimaryHeader);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/headers/PrimaryHeader.js