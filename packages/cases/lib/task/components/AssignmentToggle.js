'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AssignmentToggle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _workflowOrganizations = require('@signavio/workflow-organizations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AssignmentToggle(_ref) {
  var assigneeId = _ref.assigneeId,
      assigneeGroupId = _ref.assigneeGroupId,
      disabled = _ref.disabled;

  if (assigneeId) {
    return _react2.default.createElement(_workflowOrganizations.User, { small: true, transparent: true, value: assigneeId });
  }

  if (assigneeGroupId) {
    return _react2.default.createElement(_workflowOrganizations.Group, { small: true, transparent: true, value: assigneeGroupId });
  }

  return _react2.default.createElement(
    _hints.Hint,
    { inline: true },
    (0, _signavioI18n2.default)('Unassigned')
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/AssignmentToggle.js