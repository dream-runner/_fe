'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTask;

var _lodash = require('lodash');

function findTask(tasks, id) {
  var found = (0, _lodash.find)(tasks, { id: id });
  if (found) {
    return found;
  }

  var result = void 0;
  (0, _lodash.forEach)(tasks, function (task) {
    if (!result && task.subtasks) {
      result = findTask(task.subtasks, id);
    }
  });

  return result;
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/findTask.js