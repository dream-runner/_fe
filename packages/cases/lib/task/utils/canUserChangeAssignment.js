'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = canUserChangeAssignment;

var _canAssign = require('./canAssign');

var _canAssign2 = _interopRequireDefault(_canAssign);

var _isTaskExecutable = require('./isTaskExecutable');

var _isTaskExecutable2 = _interopRequireDefault(_isTaskExecutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function canUserChangeAssignment(task, user) {
  return (0, _isTaskExecutable2.default)(task) && (0, _canAssign2.default)(task, user);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/canUserChangeAssignment.js