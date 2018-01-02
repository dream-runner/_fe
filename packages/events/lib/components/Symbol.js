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

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _ErrorIndicator = require('./ErrorIndicator');

var _ErrorIndicator2 = _interopRequireDefault(_ErrorIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EventSymbol(_ref) {
  var actor = _ref.actor,
      icon = _ref.icon,
      iconSet = _ref.iconSet,
      error = _ref.error,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['actor', 'icon', 'iconSet', 'error', 'style']);

  if (error) {
    return _react2.default.createElement(
      'div',
      style,
      _react2.default.createElement(_ErrorIndicator2.default, { style: style('symbol') })
    );
  }

  if (icon) {
    return _react2.default.createElement(
      'div',
      style,
      _react2.default.createElement(_components.Icon, {
        small: true,
        style: style(['symbol', 'icon']),
        iconSet: iconSet,
        icon: icon
      })
    );
  }

  if (actor) {
    return _react2.default.createElement(
      'div',
      style,
      _react2.default.createElement(_workflowOrganizations.Avatar, { small: true, style: style('avatar'), user: actor })
    );
  }

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style),
    _react2.default.createElement(_components.Icon, { small: true, style: style(['symbol', 'icon']) })
  );
}

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      font = _ref2.font,
      lineHeight = _ref2.lineHeight,
      padding = _ref2.padding;

  var normalSize = _styles.utils.calculateIconSize({ font: font, lineHeight: lineHeight, padding: padding });
  var smallSize = _styles.utils.calculateSmallIconSize({
    font: font,
    lineHeight: lineHeight,
    padding: padding
  });

  return {
    position: 'relative',

    width: normalSize,
    minHeight: 1,

    symbol: (0, _extends3.default)({
      position: 'absolute',

      width: smallSize,
      height: smallSize,

      left: normalSize / 2,
      top: padding.small,

      fontSize: font.size.small,

      borderRadius: normalSize / 2

    }, _styles.utils.transition(['width', 'height', 'left', 'top', 'color'])),

    icon: {
      backgroundColor: color.mono.light,

      color: 'transparent'
    },

    avatar: {
      position: 'absolute',

      left: smallSize / 2,
      top: 0
    },

    '&important': {
      symbol: {
        left: smallSize / 2,
        top: 0
      },

      icon: {
        color: _styles.utils.textColor(color.mono.light)
      }
    },

    '&unimportant': {
      symbol: {
        width: 10,
        height: 10
      }
    },

    '&hover': {
      symbol: {
        top: 0,
        left: smallSize / 2
      },

      icon: {
        color: _styles.utils.textColor(color.mono.light)
      }
    }
  };
}, function (_ref3) {
  var error = _ref3.error,
      important = _ref3.important,
      hover = _ref3.hover;
  return {
    '&error': error,
    '&important': important,
    '&unimportant': !important && !hover,
    '&hover': hover
  };
});

exports.default = (0, _recompose.compose)(styled, (0, _components.omitProps)(['hover', 'toggleHover', 'important']))(EventSymbol);


// WEBPACK FOOTER //
// ./packages/events/lib/components/Symbol.js