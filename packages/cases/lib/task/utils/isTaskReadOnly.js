'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTaskReadOnly;

var _taskUtils = require('./taskUtils');

var _isTaskExecutable = require('./isTaskExecutable');

var _isTaskExecutable2 = _interopRequireDefault(_isTaskExecutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isTaskReadOnly(task) {
  var _getRights = (0, _taskUtils.getRights)(task, 'edit'),
      edit = _getRights.edit;

  return !(0, _isTaskExecutable2.default)(task) || !edit;
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/isTaskReadOnly.js