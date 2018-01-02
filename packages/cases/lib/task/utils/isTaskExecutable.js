'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTaskExecutable;
function isTaskExecutable(task) {
  return !task.completed && !task.canceled;
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/isTaskExecutable.js