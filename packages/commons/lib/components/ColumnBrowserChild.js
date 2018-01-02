'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.ColumnBrowserChild = ColumnBrowserChild;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _ColumnBrowserToolbar = require('./ColumnBrowserToolbar');

var _ColumnBrowserToolbar2 = _interopRequireDefault(_ColumnBrowserToolbar);

var _tiles = require('./tiles');

var _utils = require('../utils');

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ColumnBrowserChild(props) {
  var child = props.child,
      active = props.active,
      selected = props.selected,
      loading = props.loading,
      path = props.path,
      small = props.small,
      rest = (0, _objectWithoutProperties3.default)(props, ['child', 'active', 'selected', 'loading', 'path', 'small']);


  return _react2.default.createElement(
    _tiles.ActionTile,
    (0, _extends3.default)({}, rest, {
      iconSet: 'fontAwesome',
      small: small,
      icon: _utils.FileUtils.getIcon(child.title, child.mimeType, false),
      toolbar: !child.isLeaf && _react2.default.createElement(_ColumnBrowserToolbar2.default, { child: child, small: small, loading: loading })
    }),
    child.title
  );
}

var getModifiers = function getModifiers(props) {
  return {
    '&active': props.active,
    '&selected': props.selected
  };
};

var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    main: {
      paddingLeft: _styles.padding.small
    },

    icon: {
      backgroundColor: 'transparent',
      color: _styles.utils.color('white')
    },

    '&active': {
      backgroundColor: theme.color.mono.light,
      icon: {
        color: _styles.utils.color(theme.color.mono.light)
      }
    },

    '&selected': {
      backgroundColor: theme.color.primary.base,
      color: _styles.utils.color(theme.color.primary.base, { lighten: 1 }),

      icon: {
        backgroundColor: theme.color.primary.base,
        color: _styles.utils.color(theme.color.primary.base, { lighten: 1 })
      },

      ':hover': {
        backgroundColor: theme.color.primary.base
      }
    }
  };
}, getModifiers);

exports.default = styled(ColumnBrowserChild);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ColumnBrowserChild.js