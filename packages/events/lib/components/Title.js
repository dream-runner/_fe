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

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Title(_ref) {
  var time = _ref.time,
      children = _ref.children,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['time', 'children', 'style']);

  return _react2.default.createElement(
    _tiles.Tile,
    (0, _extends3.default)({}, rest, {
      style: style,
      small: true,
      transparent: true,
      toolbar: _react2.default.createElement(_components.Time, { hideIcon: true, style: style('time'), time: time })
    }),
    _react2.default.createElement(
      'span',
      style('title'),
      children
    )
  );
}


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      font = _ref2.font,
      lineHeight = _ref2.lineHeight,
      padding = _ref2.padding;

  var marginRight = _styles.utils.calculateSmallIconSize({
    font: font,
    lineHeight: lineHeight,
    padding: padding
  });

  return {
    color: color.mono.middle,

    time: {
      backgroundColor: 'white',

      fontSize: font.size.small,

      color: color.mono.lighter,

      paddingLeft: padding.small,
      paddingRight: padding.small,
      paddingTop: padding.xsmall,
      paddingBottom: padding.xsmall,

      marginRight: marginRight
    },

    main: (0, _extends3.default)({}, _styles.utils.ellipsis()),

    title: {
      backgroundColor: 'white',

      marginLeft: padding.normal - padding.small,
      marginRight: padding.normal - padding.small,

      paddingTop: padding.xsmall,
      paddingBottom: padding.xsmall,
      paddingLeft: padding.small,
      paddingRight: padding.small
    },

    '&expandable': {
      time: {
        marginRight: null
      }
    }
  };
}, function (_ref3) {
  var expandable = _ref3.expandable;
  return {
    '&expandable': expandable
  };
});

exports.default = (0, _recompose.compose)(styled, (0, _components.omitProps)(['expandable']))(Title);


// WEBPACK FOOTER //
// ./packages/events/lib/components/Title.js