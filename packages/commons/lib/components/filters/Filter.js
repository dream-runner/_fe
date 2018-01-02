'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _tiles = require('../tiles');

var _styles = require('../../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styled = (0, _styles.defaultStyle)(function (_ref) {
  var color = _ref.color;
  return {
    cursor: 'pointer',

    header: (0, _extends3.default)({}, _styles.utils.transition('opacity'), {
      backgroundColor: color.mono.light,

      ':hover': {
        opacity: 1
      }
    }),

    icon: (0, _extends3.default)({}, _styles.utils.transition('opacity'), {
      backgroundColor: 'transparent',
      opacity: 0
    }),

    '&active': {
      icon: {
        opacity: 1
      }
    },

    '&disabled': {
      header: {
        opacity: 0.75
      },

      icon: {
        opacity: 0.5
      }
    }
  };
}, function (props) {
  return {
    '&active': props.active,
    '&disabled': props.disabled
  };
});

exports.default = styled(_tiles.TextTile);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/filters/Filter.js