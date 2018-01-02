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

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _utils = require('@signavio/effektif-commons/lib/utils');

var _effektifFields = require('@signavio/effektif-fields');

var _TaskTile = require('./TaskTile');

var _TaskTile2 = _interopRequireDefault(_TaskTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dueToday = function dueToday(_ref) {
  var completed = _ref.completed,
      dueDate = _ref.dueDate;
  return !completed && (0, _extensions.moment)().twix(dueDate).countInner('days') === 0;
};

var openDue = function openDue(_ref2) {
  var completed = _ref2.completed,
      dueDate = _ref2.dueDate;
  return !completed && dueDate && (0, _extensions.moment)().isBefore(dueDate);
};
var openOverdue = function openOverdue(_ref3) {
  var completed = _ref3.completed,
      dueDate = _ref3.dueDate;
  return !completed && dueDate && (0, _extensions.moment)(dueDate).isBefore((0, _extensions.moment)());
};
var completedOverdue = function completedOverdue(_ref4) {
  var dueDate = _ref4.dueDate,
      completeTime = _ref4.completeTime;
  return dueDate && completeTime && (0, _extensions.moment)(dueDate).isBefore(completeTime);
};

var TaskRow = function TaskRow(_ref5) {
  var style = _ref5.style,
      taskId = _ref5.taskId,
      readOnly = _ref5.readOnly,
      fetchTask = _ref5.fetchTask,
      onStatusChange = _ref5.onStatusChange;

  if (fetchTask.pending) {
    return _react2.default.createElement(
      'tr',
      style('task'),
      _react2.default.createElement(
        'td',
        { colspan: '4' },
        _react2.default.createElement(_tiles.PlaceholderTile, { withHeader: true })
      )
    );
  }

  var task = fetchTask.value;
  var createTime = task.createTime,
      dueDate = task.dueDate,
      completeTime = task.completeTime;


  return _react2.default.createElement(
    'tr',
    style('task'),
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(_TaskTile2.default, {
        onStatusChange: onStatusChange,
        readOnly: readOnly,
        taskId: taskId
      })
    ),
    _react2.default.createElement(
      'td',
      style('date'),
      _react2.default.createElement(_effektifFields.Field, { readOnly: true, value: createTime, type: (0, _effektifFields.dateTimeType)() })
    ),
    _react2.default.createElement(
      'td',
      style('date'),
      openDue(task) || openOverdue(task) ? _react2.default.createElement(
        _components.Popover,
        {
          popover: getDueMessage(task, openDue(task), openOverdue(task))
        },
        _react2.default.createElement(
          'div',
          style('dueDate'),
          _react2.default.createElement(_effektifFields.Field, { readOnly: true, value: dueDate, type: (0, _effektifFields.dateTimeType)() })
        )
      ) : _react2.default.createElement(
        'div',
        style('dueDate'),
        _react2.default.createElement(_effektifFields.Field, {
          readOnly: true,
          value: dueDate,
          type: (0, _effektifFields.dateTimeType)(),
          emptyContent: '-'
        })
      )
    ),
    _react2.default.createElement(
      'td',
      style('date'),
      completedOverdue(task) ? _react2.default.createElement(
        _components.Popover,
        {
          popover: (0, _signavioI18n2.default)('Completed __timeSinceDue__ past due date', {
            timeSinceDue: _utils.DateUtils.getDurationHumanized(dueDate, completeTime)
          })
        },
        _react2.default.createElement(
          'div',
          style('completeTime'),
          _react2.default.createElement(_effektifFields.Field, { readOnly: true, value: completeTime, type: (0, _effektifFields.dateTimeType)() })
        )
      ) : _react2.default.createElement(
        'div',
        style('completeTime'),
        _react2.default.createElement(_effektifFields.Field, {
          readOnly: true,
          value: completeTime,
          type: (0, _effektifFields.dateTimeType)(),
          emptyContent: '-'
        })
      )
    )
  );
};

var getDueMessage = function getDueMessage(task, openDue, openOverdue) {
  var now = (0, _extensions.moment)();
  var dueDate = task.dueDate;


  if (openDue) {
    return (0, _signavioI18n2.default)('Due in __timeUntilDue__', {
      timeUntilDue: _utils.DateUtils.getDurationHumanized(now, dueDate)
    });
  }

  if (openOverdue) {
    return (0, _signavioI18n2.default)('__timeSinceDue__ over due date', {
      timeSinceDue: _utils.DateUtils.getDurationHumanized(now, dueDate)
    });
  }
};

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref6) {
  var taskId = _ref6.taskId;
  return {
    fetchTask: {
      type: _effektifApi.types.TASK,
      id: taskId
    }
  };
}), (0, _styles.defaultStyle)(function (_ref7) {
  var color = _ref7.color;
  return {
    date: (0, _extends3.default)({}, _styles.utils.borderLeft(1, 'solid', 'white'), _styles.utils.media.xs({
      display: 'none'
    })),
    task: (0, _extends3.default)({}, _styles.utils.borderBottom(1, 'solid', 'white')),
    '&dueToday': {
      dueDate: {
        color: color.status.warning
      }
    },
    '&openOverdue': {
      dueDate: {
        color: color.status.danger
      }
    },
    '&completedOverdue': {
      completeTime: {
        color: color.status.danger
      }
    }
  };
}, function (_ref8) {
  var fetchTask = _ref8.fetchTask;

  if (!fetchTask.value) {
    return;
  }

  return {
    '&dueToday': dueToday(fetchTask.value),
    '&openOverdue': openOverdue(fetchTask.value),
    '&completedOverdue': completedOverdue(fetchTask.value)
  };
}))(TaskRow);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/TaskRow.js