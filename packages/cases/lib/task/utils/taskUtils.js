'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAssigneeGroup = exports.isPrivate = exports.isCandidate = exports.isAssignee = exports.hasFormButtons = exports.hasCandidates = exports.hasAssigneeGroup = exports.hasAssignee = exports.getRights = exports.checkPrivate = undefined;

var _lodash = require('lodash');

var _workflowAccess = require('@signavio/workflow-access');

var checkPrivate = exports.checkPrivate = function checkPrivate(task, user) {
  return task.assigneeId === user.id;
};

var getRights = exports.getRights = function getRights(task) {
  return (0, _workflowAccess.getRights)(task.access, 'edit', 'view');
};

var hasAssignee = exports.hasAssignee = function hasAssignee(task) {
  return !!task.assignee;
};
var hasAssigneeGroup = exports.hasAssigneeGroup = function hasAssigneeGroup(task) {
  return !!task.assigneeGroup;
};

var hasCandidates = exports.hasCandidates = function hasCandidates(task) {
  return !!(task.candidates && task.candidates.count > 0);
};

var hasFormButtons = exports.hasFormButtons = function hasFormButtons(form) {
  return !!(form && form.buttons && form.buttons.length > 0);
};

var isAssignee = exports.isAssignee = function isAssignee(task, user) {
  return task.assigneeId === user.id;
};

var isCandidate = exports.isCandidate = function isCandidate(task, user) {
  return !!(0, _lodash.some)((0, _lodash.get)(task, 'candidates.items', []), function (candidate) {
    return candidate.id === user.id;
  });
};

var isPrivate = exports.isPrivate = function isPrivate(task) {
  return !!task.access;
};

var isAssigneeGroup = exports.isAssigneeGroup = function isAssigneeGroup(task) {
  var groupIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var assigneeGroup = task.assigneeGroup;

  return !!assigneeGroup && (0, _lodash.some)(groupIds, function (groupId) {
    return groupId === assigneeGroup.id;
  });
};


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/taskUtils.js