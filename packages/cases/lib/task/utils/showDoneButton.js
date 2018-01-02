'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = showDoneButton;

var _taskUtils = require('./taskUtils');

var _canCompleteTask = require('./canCompleteTask');

var _canCompleteTask2 = _interopRequireDefault(_canCompleteTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showDoneButton(task, user) {
  var form = task.form;


  if (form) {
    if ((0, _taskUtils.hasFormButtons)(form)) {
      return false;
    }
  }

  if (task.completed) {
    if ((0, _taskUtils.isPrivate)(task)) {
      var rights = (0, _taskUtils.getRights)(task);

      if (!(0, _taskUtils.isAssignee)(task, user) && !rights.edit) {
        return false;
      }
    }
  } else {
    if (!(0, _canCompleteTask2.default)(task, user)) {
      return false;
    }
  }

  if ((0, _taskUtils.hasCandidates)(task) || (0, _taskUtils.hasAssigneeGroup)(task)) {
    if ((0, _taskUtils.isPrivate)(task)) {
      return (0, _taskUtils.isAssignee)(task, user);
    }
  }

  return true;
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/showDoneButton.js