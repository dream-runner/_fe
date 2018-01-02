'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _workflowAccess = require('@signavio/workflow-access');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RestrictionsInfo(_ref) {
  var task = _ref.task,
      user = _ref.user;

  var rights = (0, _workflowAccess.getRights)(task.access, 'edit');

  if (task.access && !task.assignee && (0, _utils.canUserChangeAssignment)(task, user)) {
    return _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)('In order to complete this task you need to take the assignment first.')
    );
  }

  if (!rights.edit) {
    if ((0, _utils.canCompleteTask)(task, user)) {
      return null;
    }

    return _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)("You don't have permission to edit or complete this task.")
    );
  }

  if (task.completed) {
    return _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)("This task was already completed, so it can't be changed anymore.")
    );
  }

  return null;
}

exports.default = (0, _effektifApi.withUser)(RestrictionsInfo);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/RestrictionsInfo.js