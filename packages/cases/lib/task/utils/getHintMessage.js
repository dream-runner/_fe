'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHintMessage;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getHintMessage(task, locked) {
  if (locked) {
    return (0, _signavioI18n2.default)('In order to complete this task, you need to take the assignment first.');
  }

  if (task.completed && !task.hasForm) {
    return;
  }

  if (task.completed && task.hasForm) {
    return (0, _signavioI18n2.default)("This task was already completed, so it can't be changed anymore.");
  }
  return;
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/getHintMessage.js