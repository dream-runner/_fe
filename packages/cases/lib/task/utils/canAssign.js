'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = canAssign;

var _taskUtils = require('./taskUtils.js');

function canAssign(task, user) {
  if (task.canceled) {
    return false;
  }

  if (!(0, _taskUtils.isPrivate)(task)) {
    return true;
  }

  var rights = (0, _taskUtils.getRights)(task);

  if (rights.edit) {
    return true;
  }

  if (!task.assignee) {
    if ((0, _taskUtils.hasAssigneeGroup)(task)) {
      return (0, _taskUtils.isAssigneeGroup)(task, user.groupIds);
    }
    return (0, _taskUtils.isCandidate)(task, user);
  }

  return (0, _taskUtils.isAssignee)(task, user);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/canAssign.js