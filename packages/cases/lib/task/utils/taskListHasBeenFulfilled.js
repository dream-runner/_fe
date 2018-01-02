'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = taskListHasBeenFulfilled;

var _lodash = require('lodash');

var getPending = function getPending(props) {
  return (0, _lodash.get)(props, 'fetchTasks.pending', true);
};

function taskListHasBeenFulfilled(props, nextProps) {
  return getPending(props) && !getPending(nextProps);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/taskListHasBeenFulfilled.js