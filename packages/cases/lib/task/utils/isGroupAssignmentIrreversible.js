'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isGroupAssignmentIrreversible;

var _lodash = require('lodash');

var _taskUtils = require('./taskUtils');

var _isTaskExecutable = require('./isTaskExecutable');

var _isTaskExecutable2 = _interopRequireDefault(_isTaskExecutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var willGroupHaveAccess = function willGroupHaveAccess(task, user, targetGroupId) {
  var rights = (0, _taskUtils.getRights)(task);

  if (rights.edit) {
    return true;
  }

  return (0, _lodash.some)(user.groupIds || [], function (groupId) {
    return groupId === targetGroupId;
  });
};

function isGroupAssignmentIrreversible(task, user, groupId) {
  return (0, _isTaskExecutable2.default)(task) && !willGroupHaveAccess(task, user, groupId);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/isGroupAssignmentIrreversible.js