'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUserAssignmentIrreversible;

var _isTaskExecutable = require('./isTaskExecutable');

var _isTaskExecutable2 = _interopRequireDefault(_isTaskExecutable);

var _willUserHaveAccess = require('./willUserHaveAccess');

var _willUserHaveAccess2 = _interopRequireDefault(_willUserHaveAccess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isUserAssignmentIrreversible(task, user) {
  return (0, _isTaskExecutable2.default)(task) && !(0, _willUserHaveAccess2.default)(task, user);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/isUserAssignmentIrreversible.js