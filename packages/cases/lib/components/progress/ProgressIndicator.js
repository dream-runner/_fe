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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _TaskList = require('./TaskList');

var _TaskList2 = _interopRequireDefault(_TaskList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This view visualized the current progress of a case in terms of completed and open actions
 */
function ProgressIndicator(_ref) {
  var stats = _ref.stats,
      _ref$tasksOpen = _ref.tasksOpen,
      tasksOpen = _ref$tasksOpen === undefined ? [] : _ref$tasksOpen,
      _ref$tasksCompleted = _ref.tasksCompleted,
      tasksCompleted = _ref$tasksCompleted === undefined ? [] : _ref$tasksCompleted,
      toggleHover = _ref.toggleHover,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['stats', 'tasksOpen', 'tasksCompleted', 'toggleHover']);

  var open = tasksOpen.length;
  var completed = tasksCompleted.length;
  var scale = Math.max(stats.open, stats.completed);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, rest.style),
    _react2.default.createElement(
      'div',
      rest.style('indicator'),
      _react2.default.createElement(
        _Bar2.default,
        {
          fromRight: true,
          style: rest.style('completed'),
          title: completed > 0 ? (0, _signavioI18n2.default)('__count__ completed task', '__count__ completed tasks', {
            count: completed
          }) : undefined,
          popover: completed === 0 ? _react2.default.createElement(
            _hints.Hint,
            { inline: true },
            (0, _signavioI18n2.default)('No completed tasks')
          ) : _react2.default.createElement(_TaskList2.default, { tasks: tasksCompleted }),
          value: completed,
          scale: scale
        },
        completed
      )
    ),
    _react2.default.createElement('div', rest.style('separator')),
    _react2.default.createElement(
      'div',
      rest.style('indicator'),
      _react2.default.createElement(
        _Bar2.default,
        {
          style: rest.style('open'),
          title: open > 0 ? (0, _signavioI18n2.default)('__count__ open task', '__count__ open tasks', {
            count: open
          }) : undefined,
          popover: open === 0 ? _react2.default.createElement(
            _hints.Hint,
            { inline: true },
            (0, _signavioI18n2.default)('No open tasks')
          ) : _react2.default.createElement(_TaskList2.default, { tasks: tasksOpen }),
          value: open,
          scale: scale
        },
        open
      )
    ),
    _react2.default.createElement(_components.Clearfix, null)
  );
}

var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    indicator: {
      width: 50,

      float: 'left',

      paddingTop: _styles.variables.lineHeight.block / 2 - 3 //3 is half the height of a bar
    },

    separator: {
      float: 'left',

      height: _styles.variables.lineHeight.block,
      width: 1,

      backgroundColor: theme.color.mono.lighter
    },

    completed: {
      bar: (0, _extends3.default)({}, _styles.utils.borderRight(0)),

      info: {
        display: 'none'
      }
    },

    open: {
      bar: (0, _extends3.default)({
        backgroundColor: (0, _color2.default)(theme.color.primary.base).fade(0.3).string()

      }, _styles.utils.border('1px', 'solid', theme.color.primary.base), _styles.utils.borderLeft(0)),

      info: {
        display: 'none'
      }
    }
  };
});

exports.default = styled(ProgressIndicator);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/progress/ProgressIndicator.js