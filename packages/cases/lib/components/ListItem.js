'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _moment = require('@signavio/effektif-commons/lib/extensions/moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('@signavio/effektif-commons/lib/utils');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _progress = require('./progress');

var _progress2 = _interopRequireDefault(_progress);

var _priority = require('./priority');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Case(_ref) {
  var caze = _ref.caze,
      stats = _ref.stats,
      style = _ref.style,
      onMouseOut = _ref.onMouseOut,
      onMouseOver = _ref.onMouseOver,
      selectMode = _ref.selectMode,
      selected = _ref.selected,
      onSelectionChange = _ref.onSelectionChange;

  var cls = _utils.CSSUtils.cls({
    case: true,
    closed: caze.closed
  });

  var gotEditRight = caze.access && caze.access.edit || !caze.access;
  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, style, {
      className: cls,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut
    }),
    _react2.default.createElement(
      _tiles.TextTile,
      {
        style: style('content'),
        iconSet: 'fontAwesome',
        header: _react2.default.createElement(
          _components.List,
          { direction: 'horizontal' },
          selectMode && (!gotEditRight ? _react2.default.createElement(
            _components.Popover,
            {
              placement: 'right',
              popover: _react2.default.createElement(
                _hints.Hint,
                { inline: true },
                (0, _signavioI18n2.default)('You need editing rights to perform actions on this case.')
              )
            },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _components.Disable,
                null,
                _react2.default.createElement(_components.Icon, { icon: 'square' })
              )
            )
          ) : _react2.default.createElement(_components.Icon, {
            style: style('selectable'),
            icon: selected ? 'square-check' : 'square',
            onClick: onSelectionChange
          })),
          _react2.default.createElement(_components.Icon, {
            style: style('statusIndicator'),
            iconSet: 'fontAwesome',
            icon: caze.closed || caze.canceled ? 'folder-o' : 'folder-open-o'
          }),
          !caze.closed && !(0, _lodash.isUndefined)(caze.priority) && _react2.default.createElement(_priority.Priority, (0, _extends3.default)({}, style('priority'), { priority: caze.priority }))
        ),
        subtitle: !caze.closed && caze.dueDate && _react2.default.createElement(
          _components.Popover,
          {
            small: true,
            placement: 'bottom',
            popover: (0, _moment2.default)(caze.dueDate).format('LL')
          },
          _react2.default.createElement(
            'span',
            null,
            _utils.DateUtils.getDueMessage(caze.dueDate)
          )
        ),
        toolbar: _react2.default.createElement(_progress2.default, {
          style: style('progress'),
          stats: stats,
          tasksOpen: caze.tasksOpen,
          tasksCompleted: caze.tasksCompleted
        })
      },
      _react2.default.createElement(
        'a',
        (0, _extends3.default)({}, style('link'), { href: '/case/' + caze.id, title: caze.name }),
        caze.name || _react2.default.createElement(
          _hints.Hint,
          { inline: true },
          (0, _signavioI18n2.default)('Unnamed case')
        )
      )
    )
  );
}

var enhance = (0, _recompose.compose)((0, _recompose.withState)('hover', 'toggleHover', false), (0, _recompose.withHandlers)({
  onMouseOver: function onMouseOver(_ref2) {
    var toggleHover = _ref2.toggleHover;
    return function () {
      return toggleHover(true);
    };
  },
  onMouseOut: function onMouseOut(_ref3) {
    var toggleHover = _ref3.toggleHover;
    return function () {
      return toggleHover(false);
    };
  },
  onSelectionChange: function onSelectionChange(_ref4) {
    var caze = _ref4.caze,
        _onSelectionChange = _ref4.onSelectionChange;
    return function () {
      _onSelectionChange(caze);
    };
  }
}), (0, _styles.defaultStyle)(function (_ref5) {
  var padding = _ref5.padding,
      color = _ref5.color;

  return {
    progress: {
      marginRight: padding.normal
    },

    content: {
      icon: {
        float: 'left'
      }
    },

    priority: {
      float: 'right',

      marginLeft: 1,

      width: padding.xsmall,
      height: _styles.variables.lineHeight.block
    },

    selectable: {
      backgroundColor: color.mono.light,
      color: color.mono.middle
    },

    statusIndicator: {
      backgroundColor: color.mono.light,
      color: color.mono.middle
    },

    link: {
      cursor: 'pointer'
    },

    '&closed': {
      link: {
        color: color.mono.middle
      }
    },

    '&hovered': {
      progress: {
        completed: {
          info: {
            display: 'block'
          }
        },

        open: {
          info: {
            display: 'block'
          }
        }
      }
    },
    '&selected': {
      selectable: {
        color: color.mono.ultradark,
        backgroundColor: color.primary.lighter
      }
    }
  };
}, function (_ref6) {
  var hover = _ref6.hover,
      caze = _ref6.caze,
      selected = _ref6.selected;
  return {
    '&hovered': hover,
    '&closed': caze.closed,
    '&selected': selected
  };
}));

exports.default = enhance(Case);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/ListItem.js