'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _recompose = require('recompose');

var _styles = require('../../styles');

var _PrimaryHeader = require('./PrimaryHeader');

var _PrimaryHeader2 = _interopRequireDefault(_PrimaryHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styled = (0, _styles.defaultStyle)(function (_ref) {
  var padding = _ref.padding,
      font = _ref.font,
      color = _ref.color;

  var backgroundColor = color.header.secondary || color.primary.light;

  return {
    paddingTop: null,

    title: {
      display: null,

      marginBottom: 0
    },

    input: {
      fontSize: font.size.xxlarge,
      lineHeight: font.size.xxlarge + padding.normal + 'px',

      backgroundColor: backgroundColor,
      color: _styles.utils.color(backgroundColor),

      paddingTop: padding.large,
      width: '100%',

      '&readOnly': {
        backgroundColor: backgroundColor,
        color: _styles.utils.color(backgroundColor)
      },

      ':hover': {
        backgroundColor: (0, _color2.default)(backgroundColor).lighten(0.05).string()
      },

      ':focus': {
        backgroundColor: (0, _color2.default)(backgroundColor).lighten(0.05).string()
      }
    },

    icon: {
      top: null,
      right: null,
      left: padding.normal,
      bottom: padding.normal,

      fontSize: '40px',

      color: 'white',

      zIndex: 0
    },

    '&light': {
      input: (0, _extends3.default)({
        backgroundColor: null,
        color: _styles.utils.color('white'),

        paddingTop: null,
        paddingLeft: padding.small,
        paddingRight: padding.small,

        width: null

      }, _styles.utils.borderBottom(2, 'solid', backgroundColor), {

        ':hover': {
          backgroundColor: null
        },

        ':focus': {
          backgroundColor: null
        },

        '&readOnly': {
          backgroundColor: null
        }
      })
    }
  };
}, function (_ref2) {
  var light = _ref2.light;
  return {
    '&light': light
  };
});

exports.default = (0, _recompose.compose)((0, _recompose.defaultProps)({
  className: 'secondary-header'
}), styled)(_PrimaryHeader2.default);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/headers/SecondaryHeader.js