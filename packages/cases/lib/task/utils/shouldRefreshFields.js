'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shouldRefreshFields;

var _taskHasBeenUpdated = require('./taskHasBeenUpdated');

var _taskHasBeenUpdated2 = _interopRequireDefault(_taskHasBeenUpdated);

var _taskListHasBeenFulfilled = require('./taskListHasBeenFulfilled');

var _taskListHasBeenFulfilled2 = _interopRequireDefault(_taskListHasBeenFulfilled);

var _userSwitchedTask = require('./userSwitchedTask');

var _userSwitchedTask2 = _interopRequireDefault(_userSwitchedTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shouldRefreshFields(props, nextProps) {
  return (0, _taskHasBeenUpdated2.default)(props, nextProps) || (0, _taskListHasBeenFulfilled2.default)(props, nextProps) || (0, _userSwitchedTask2.default)(props, nextProps);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/shouldRefreshFields.js