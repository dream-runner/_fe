'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isExpanded;

var _lodash = require('lodash');

var matchesSubtask = function matchesSubtask(task, activeTaskId) {
  if (task.id === activeTaskId) {
    return true;
  }

  return (0, _lodash.some)(task.subtasks, function (subtaskId) {
    return subtaskId === activeTaskId;
  });
};
function isExpanded(task, activeTaskId) {
  if (!activeTaskId) {
    return false;
  }

  if (task.id === activeTaskId) {
    return true;
  }

  return matchesSubtask(task, activeTaskId);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/isExpanded.js