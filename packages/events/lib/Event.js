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

var _lodash = require('lodash');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _components2 = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Event(_ref) {
  var event = _ref.event,
      icon = _ref.icon,
      title = _ref.title,
      children = _ref.children,
      expanded = _ref.expanded,
      important = _ref.important,
      toggleExpanded = _ref.toggleExpanded,
      iconSet = _ref.iconSet,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event', 'icon', 'title', 'children', 'expanded', 'important', 'toggleExpanded', 'iconSet', 'style']);

  if (!hasChildren(children)) {
    return _react2.default.createElement(
      _components.Popover,
      {
        small: true,
        popover: _react2.default.createElement(
          _tiles.TextTile,
          { transparent: true, subtitle: (0, _extensions.moment)(event.time).format('LLL') },
          title
        )
      },
      _react2.default.createElement(
        _components2.Header,
        (0, _extends3.default)({}, rest, { iconSet: iconSet, event: event, icon: icon, important: important }),
        title
      )
    );
  }

  return _react2.default.createElement(
    _components.Collapsible,
    (0, _extends3.default)({}, rest, style, {
      expanded: expanded,
      header: _react2.default.createElement(
        _tiles.Tile,
        {
          transparent: true,
          onClick: function onClick() {
            return toggleExpanded(!expanded);
          },
          toolbar: _react2.default.createElement(_components.Icon, {
            iconSet: 'fontAwesome',
            small: true,
            style: style('toggle'),
            icon: expanded ? 'angle-up' : 'angle-down'
          })
        },
        _react2.default.createElement(
          _components.Popover,
          {
            small: true,
            popover: _react2.default.createElement(
              _tiles.TextTile,
              { transparent: true, subtitle: (0, _extensions.moment)(event.time).format('LLL') },
              title
            )
          },
          _react2.default.createElement(
            _components2.Header,
            (0, _extends3.default)({ iconSet: iconSet, event: event, icon: icon, important: important }, {
              expandable: true,
              style: style('header')
            }),
            title
          )
        )
      )
    }),
    _react2.default.createElement(
      _components2.Body,
      null,
      children
    )
  );
}

var hasChildren = function hasChildren(children) {
  return (0, _lodash.isString)(children) || (0, _lodash.some)(_react.Children.toArray(children), _react.isValidElement);
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('expanded', 'toggleExpanded', function (_ref2) {
  var expanded = _ref2.expanded;
  return expanded;
}), (0, _styles.defaultStyle)(function (_ref3) {
  var color = _ref3.color;
  return {
    '&expandable': {
      toggle: {
        display: 'block',
        cursor: 'pointer',
        color: color.mono.middle
      }
    }
  };
}, function (_ref4) {
  var children = _ref4.children;
  return {
    '&expandable': hasChildren(children)
  };
}))(Event);


// WEBPACK FOOTER //
// ./packages/events/lib/Event.js