'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = willUserHaveAccess;

var _taskUtils = require('./taskUtils');

function willUserHaveAccess(task, user) {
  var rights = (0, _taskUtils.getRights)(task);

  if (rights.edit) {
    return true;
  }

  if ((0, _taskUtils.hasAssigneeGroup)(task)) {
    return (0, _taskUtils.isAssigneeGroup)(task, user.groupIds);
  }

  if (rights.view) {
    return false;
  }

  return (0, _taskUtils.isCandidate)(task, user);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/willUserHaveAccess.js