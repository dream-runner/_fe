'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskName = taskName;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function taskName(task) {
  return task.name || _react2.default.createElement(
    _hints.Hint,
    { inline: true },
    (0, _signavioI18n2.default)('Unnamed task')
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/utils/index.js