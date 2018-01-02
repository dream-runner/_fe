'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _reactRouterDom = require('react-router-dom');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _caseUrl = require('../../caseUrl');

var _caseUrl2 = _interopRequireDefault(_caseUrl);

var _utils = require('../utils');

var _InlineAssignment = require('./InlineAssignment');

var _InlineAssignment2 = _interopRequireDefault(_InlineAssignment);

var _StatusIcon = require('./StatusIcon');

var _StatusIcon2 = _interopRequireDefault(_StatusIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaskTile = function TaskTile(_ref) {
  var onChange = _ref.onChange,
      readOnly = _ref.readOnly,
      style = _ref.style,
      taskId = _ref.taskId,
      user = _ref.user,
      completeTask = _ref.completeTask,
      reopenTask = _ref.reopenTask,
      fetchTask = _ref.fetchTask,
      onStatusChange = _ref.onStatusChange;

  if (fetchTask.pending) {
    return _react2.default.createElement(_tiles.PlaceholderTile, { withHeader: true });
  }

  var task = fetchTask.value;

  return _react2.default.createElement(
    _tiles.TextTile,
    {
      header: _react2.default.createElement(
        _components.List,
        { direction: 'horizontal' },
        _react2.default.createElement(_StatusIcon2.default, {
          task: task,
          locked: !(0, _utils.canCompleteTask)(task, user),
          changing: completeTask.pending || reopenTask.pending,
          readOnly: readOnly,
          onClick: onStatusChange
        }),
        _react2.default.createElement(_InlineAssignment2.default, {
          onChange: onChange,
          readOnly: !(0, _utils.canUserChangeAssignment)(task, user),
          disabled: !(0, _utils.isTaskExecutable)(task),
          task: task
        })
      ),
      subtitle: getSubtitle(task.subtasks)
    },
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: (0, _caseUrl2.default)({ caseId: task.caseId, taskId: taskId }) },
      task.name || _react2.default.createElement(
        _components.Empty,
        null,
        (0, _signavioI18n2.default)('Unnamed task')
      )
    )
  );
};


var getSubtitle = function getSubtitle(subtasks) {
  if (!subtasks || subtasks.length === 0) {
    return;
  }

  var completed = (0, _lodash.filter)(subtasks, 'completed').length;

  if (completed === 0) {
    return (0, _signavioI18n2.default)('__count__ open subtask', '__count__ open subtasks', {
      count: subtasks.length
    });
  }

  return (0, _signavioI18n2.default)('__completed__ / __all__ subtasks completed', {
    completed: completed,
    all: subtasks.length
  });
};

exports.default = (0, _recompose.compose)(_effektifApi.withUser, (0, _effektifApi.connect)(function (_ref2) {
  var taskId = _ref2.taskId;
  return {
    fetchTask: {
      type: _effektifApi.types.TASK,
      id: taskId,
      denormalize: true
    },
    updateTask: {
      type: _effektifApi.types.TASK,
      method: 'update',
      id: taskId
    },
    completeTask: {
      type: _effektifApi.types.TASK_COMPLETE,
      method: 'create'
    },
    reopenTask: {
      type: _effektifApi.types.TASK_REOPEN,
      method: 'create'
    }
  };
}), (0, _effektifApi.fulfillRequestThen)({
  completeTask: function completeTask(_ref3) {
    var onStatusChange = _ref3.onStatusChange;

    if (onStatusChange) {
      onStatusChange();
    }
  },
  reopenTask: function reopenTask(_ref4) {
    var onStatusChange = _ref4.onStatusChange;

    if (onStatusChange) {
      onStatusChange();
    }
  }
}), (0, _recompose.withHandlers)({
  onChange: function onChange(_ref5) {
    var updateTask = _ref5.updateTask;
    return function (changes) {
      return updateTask(changes);
    };
  },
  onStatusChange: function onStatusChange(_ref6) {
    var fetchTask = _ref6.fetchTask,
        completeTask = _ref6.completeTask,
        reopenTask = _ref6.reopenTask,
        taskId = _ref6.taskId;
    return function () {
      if (completeTask.pending || reopenTask.pending) {
        return;
      }

      if (fetchTask.value.completed) {
        reopenTask({ id: taskId });
      } else {
        completeTask({ id: taskId });
      }
    };
  }
}), (0, _styles.defaultStyle)(function (_ref7) {
  var color = _ref7.color;
  return {
    '&completed': {
      name: {
        color: color.mono.middle
      }
    }
  };
}, function (_ref8) {
  var fetchTask = _ref8.fetchTask;
  return {
    '&completed': fetchTask.value && fetchTask.value.completed
  };
}))(TaskTile);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/TaskTile.js