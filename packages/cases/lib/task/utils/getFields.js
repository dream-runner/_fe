'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFields;

var _lodash = require('lodash');

var _findTask = require('./findTask');

var _findTask2 = _interopRequireDefault(_findTask);

var _taskHasBeenUpdated = require('./taskHasBeenUpdated');

var _taskHasBeenUpdated2 = _interopRequireDefault(_taskHasBeenUpdated);

var _taskListHasBeenFulfilled = require('./taskListHasBeenFulfilled');

var _taskListHasBeenFulfilled2 = _interopRequireDefault(_taskListHasBeenFulfilled);

var _userSwitchedTask = require('./userSwitchedTask');

var _userSwitchedTask2 = _interopRequireDefault(_userSwitchedTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFields(props, nextProps) {
  var task = {};

  if ((0, _taskHasBeenUpdated2.default)(props, nextProps)) {
    task = (0, _lodash.get)(nextProps, 'updateTask.value', {});
  }

  if ((0, _taskListHasBeenFulfilled2.default)(props, nextProps)) {
    task = (0, _findTask2.default)(nextProps.fetchTasks.value || [], props.match.params.taskId);
  }

  if ((0, _userSwitchedTask2.default)(props, nextProps)) {
    task = (0, _lodash.get)(nextProps, 'task', {});
  }

  return (0, _lodash.get)(task, 'form.fields', []);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/getFields.js