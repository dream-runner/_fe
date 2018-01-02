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

var _Symbol2 = require('./Symbol');

var _Symbol3 = _interopRequireDefault(_Symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Header(_ref) {
  var event = _ref.event,
      icon = _ref.icon,
      children = _ref.children,
      iconSet = _ref.iconSet,
      important = _ref.important,
      style = _ref.style,
      hover = _ref.hover,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event', 'icon', 'children', 'iconSet', 'important', 'style', 'hover']);
  var actor = event.actor,
      error = event.error;


  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({}, rest, {
      small: true,
      transparent: true,
      style: style,
      header: _react2.default.createElement(_Symbol3.default, (0, _extends3.default)({ error: error, iconSet: iconSet, actor: actor, icon: icon, important: important }, {
        style: style('symbol'),
        hover: hover
      }))
    }),
    _react2.default.createElement(_components.Divider, { style: style('divider'), padding: 'none' }),
    children
  );
}

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var padding = _ref2.padding;
  return (0, _extends3.default)({
    position: 'relative',

    opacity: 0.5

  }, _styles.utils.transition('opacity'), {

    divider: {
      position: 'absolute',

      top: '50%',
      left: 0,

      width: '100%',

      paddingTop: null,
      paddingBottom: null,

      zIndex: -1
    },

    title: {
      display: 'inline',

      backgroundColor: 'white',

      marginLeft: padding.normal - padding.small,
      marginRight: padding.normal - padding.small,

      paddingLeft: padding.small,
      paddingRight: padding.small
    },

    '&expandable': {
      cursor: 'pointer'
    },

    '&important': {
      opacity: 1
    },

    '&hover': {
      opacity: 1
    }
  });
}, function (_ref3) {
  var expandable = _ref3.expandable,
      important = _ref3.important,
      hover = _ref3.hover;
  return {
    '&expandable': expandable,
    '&important': important,
    '&hover': hover
  };
});

exports.default = (0, _recompose.compose)((0, _recompose.withState)('hover', 'toggleHover', false), (0, _recompose.withHandlers)({
  onMouseOver: function (_onMouseOver) {
    function onMouseOver(_x) {
      return _onMouseOver.apply(this, arguments);
    }

    onMouseOver.toString = function () {
      return _onMouseOver.toString();
    };

    return onMouseOver;
  }(function (_ref4) {
    var toggleHover = _ref4.toggleHover,
        onMouseOver = _ref4.onMouseOver;
    return function (ev) {
      toggleHover(true);

      if (onMouseOver) {
        onMouseOver(ev);
      }
    };
  }),
  onMouseOut: function (_onMouseOut) {
    function onMouseOut(_x2) {
      return _onMouseOut.apply(this, arguments);
    }

    onMouseOut.toString = function () {
      return _onMouseOut.toString();
    };

    return onMouseOut;
  }(function (_ref5) {
    var toggleHover = _ref5.toggleHover,
        onMouseOut = _ref5.onMouseOut;
    return function (ev) {
      toggleHover(false);

      if (onMouseOut) {
        onMouseOut(ev);
      }
    };
  })
}), styled, (0, _components.omitProps)(['toggleHover', 'expandable']))(Header);


// WEBPACK FOOTER //
// ./packages/events/lib/components/Header.js