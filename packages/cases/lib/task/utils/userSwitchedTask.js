'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = userSwitchedTask;

var _lodash = require('lodash');

var getTaskId = function getTaskId(props) {
  return (0, _lodash.get)(props, 'match.params.taskId');
};

function userSwitchedTask(props, nextProps) {
  return getTaskId(props) !== getTaskId(nextProps);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/userSwitchedTask.js