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

var _styles = require('@signavio/effektif-commons/lib/styles');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _TaskRow = require('./TaskRow');

var _TaskRow2 = _interopRequireDefault(_TaskRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TasksTable(_ref) {
  var readOnly = _ref.readOnly,
      style = _ref.style,
      taskIds = _ref.taskIds,
      onStatusChange = _ref.onStatusChange;

  return _react2.default.createElement(
    'table',
    style,
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          style('firstColumn'),
          _react2.default.createElement(
            _tiles.TextTile,
            { transparent: true },
            (0, _signavioI18n2.default)('Task')
          )
        ),
        _react2.default.createElement(
          'th',
          style('columns'),
          _react2.default.createElement(
            _tiles.TextTile,
            { transparent: true },
            (0, _signavioI18n2.default)('Created')
          )
        ),
        _react2.default.createElement(
          'th',
          style('columns'),
          _react2.default.createElement(
            _tiles.TextTile,
            { transparent: true },
            (0, _signavioI18n2.default)('Due date')
          )
        ),
        _react2.default.createElement(
          'th',
          style('columns'),
          _react2.default.createElement(
            _tiles.TextTile,
            { transparent: true },
            (0, _signavioI18n2.default)('Completed')
          )
        )
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      (0, _lodash.isEmpty)(taskIds) && _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          (0, _extends3.default)({ colSpan: '4' }, style('empty')),
          _react2.default.createElement(
            _hints.Hint,
            null,
            (0, _signavioI18n2.default)('No tasks have been created yet.')
          )
        )
      ),
      (0, _lodash.map)(taskIds, function (taskId) {
        return _react2.default.createElement(_TaskRow2.default, {
          key: taskId,
          taskId: taskId,
          readOnly: readOnly,
          onStatusChange: onStatusChange
        });
      })
    )
  );
}

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color;
  return {
    width: '100%',

    empty: (0, _extends3.default)({}, _styles.utils.borderLeft(1, 'solid', color.mono.light), _styles.utils.borderRight(1, 'solid', color.mono.light)),

    firstColumn: (0, _extends3.default)({
      width: '55%'
    }, _styles.utils.borderLeft(1, 'solid', color.mono.light), _styles.utils.borderTop(1, 'solid', color.mono.light), _styles.utils.borderRight(1, 'solid', color.mono.light), _styles.utils.borderBottom(2, 'solid', color.mono.light), _styles.utils.media.xs({
      width: '100%'
    })),
    columns: (0, _extends3.default)({
      width: '15%'
    }, _styles.utils.borderLeft(1, 'solid', color.mono.light), _styles.utils.borderTop(1, 'solid', color.mono.light), _styles.utils.borderRight(1, 'solid', color.mono.light), _styles.utils.borderBottom(2, 'solid', color.mono.light), _styles.utils.media.xs({
      display: 'none'
    }))
  };
});

exports.default = styled(TasksTable);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/TasksTable.js