'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _recompose = require('recompose');

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _reactMentions = require('react-mentions');

var _styles = require('../styles');

var _higherOrder = require('./higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stretchdelay = _radium2.default.keyframes({
  '0%': { transform: 'scaleY(0.4)' },
  '40%': { transform: 'scaleY(0.4)' },
  '100%': { transform: 'scaleY(0.4)' },

  '20%': { transform: 'scaleY(1.0)' }
}, 'stretchdelay');

var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    backgroundColor: 'white',

    input: {
      fontSize: _styles.font.size.form,

      textAlign: 'left'
    },

    suggestions: (0, _extends3.default)({
      maxWidth: 350,
      maxHeight: 500,

      overflowY: 'auto',

      zIndex: 100,

      fontSize: _styles.font.size.form

    }, _styles.utils.boxShadow(), _styles.utils.border('1px', 'solid', theme.color.mono.light), {

      item: {
        '&focused': {
          backgroundColor: theme.color.mono.ultralight
        }
      },

      loadingIndicator: {
        spinner: {
          marginTop: _styles.padding.xsmall,
          marginBottom: _styles.padding.xsmall,

          width: 100,
          height: _styles.padding.small,

          textAlign: 'center',
          fontSize: _styles.font.size.xsmall,

          element: {
            display: 'inline-block',

            backgroundColor: '#999',

            height: '100%',
            width: 2,

            marginLeft: 3,
            marginRight: 3,

            animation: 'x 1.2s infinite ease-in-out',
            animationName: stretchdelay
          },

          element2: { animationDelay: '-1.1s' },
          element3: { animationDelay: '-1.0s' },
          element4: { animationDelay: '-0.9s' },
          element5: { animationDelay: '-0.8s' }
        }
      }
    }),

    '&multiLine': {
      input: {
        minHeight: 63,
        lineHeight: theme.lineHeight,

        height: '100%',

        paddingLeft: _styles.padding.normal,
        paddingRight: _styles.padding.normal,
        paddingTop: 10.5,
        paddingBottom: 10.5
      }
    },

    '&singleLine': {
      input: {
        display: 'block',

        height: _styles.variables.lineHeight.block,
        lineHeight: _styles.variables.lineHeight.block + 'px',

        width: '100%',

        paddingLeft: _styles.padding.normal,
        paddingRight: _styles.padding.normal
      }
    }
  };
});

exports.default = (0, _recompose.compose)(styled, (0, _higherOrder.omitProps)(['bindables', 'infoText', 'hasFocus', 'renderPreview']))(_reactMentions.MentionsInput);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/MentionsInput.js