'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = canCompleteTask;

var _taskUtils = require('./taskUtils');

function canCompleteTask(task, user) {
  if ((0, _taskUtils.isPrivate)(task)) {
    return (0, _taskUtils.checkPrivate)(task, user);
  }

  return true;
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/canCompleteTask.js