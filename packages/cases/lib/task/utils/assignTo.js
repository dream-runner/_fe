'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = assignTo;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignTo(task, user) {
  if (user && task.assigneeId === user.id) {
    return task;
  }

  var assignSubtasks = task.subtasks && task.subtasks.every(function (subtask) {
    return subtask.completed || !subtask.assignee || subtask.assignee === task.assignee;
  });

  var newTask = (0, _extends3.default)({}, task, {
    assignee: user,
    assigneeId: user ? user.id : null,
    assigneeGroup: null,
    assigneeGroupId: null
  });

  if (assignSubtasks) {
    newTask = (0, _extends3.default)({}, newTask, {
      subtasks: task.subtasks.map(function (subtask) {
        if (task.completed) {
          return subtask;
        }

        return assignTo(subtask, user);
      })
    });
  }

  return newTask;
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/assignTo.js