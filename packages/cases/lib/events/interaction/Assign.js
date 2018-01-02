'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = TaskAssignEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _effektifApi = require('@signavio/effektif-api');

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TaskAssignEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);

  return _react2.default.createElement(_workflowEvents2.default, (0, _extends3.default)({}, rest, { event: event, title: getTitle(event), icon: 'user' }));
}


var getTitle = function getTitle(_ref2) {
  var actor = _ref2.actor,
      assignee = _ref2.assignee,
      assigneeGroup = _ref2.assigneeGroup,
      task = _ref2.task,
      caseId = _ref2.caseId;

  if (actor && assignee && actor.id === assignee.id) {
    // a actor took assignment for himself
    return (0, _signavioI18n2.default)('__user__ took assignment of __task__', {
      user: _effektifApi.userUtils.name(actor),
      task: _react2.default.createElement(_components.TaskLink, { task: task, caseId: caseId })
    });
  }

  if (assignee) {
    // assignment to another actor
    return (0, _signavioI18n2.default)('__user__ assigned __task__ to __actor__', {
      user: _effektifApi.userUtils.name(actor),
      task: _react2.default.createElement(_components.TaskLink, { task: task, caseId: caseId }),
      actor: _effektifApi.userUtils.name(assignee)
    });
  }

  if (assigneeGroup) {
    return (0, _signavioI18n2.default)('__user__ assigned __task__ to __group__', {
      user: _effektifApi.userUtils.name(actor),
      task: _react2.default.createElement(_components.TaskLink, { task: task, caseId: caseId }),
      group: assigneeGroup.name
    });
  }

  // was unassigned
  return (0, _signavioI18n2.default)('__user__ removed assignment of __task__', {
    user: _effektifApi.userUtils.name(actor),
    task: _react2.default.createElement(_components.TaskLink, { task: task, caseId: caseId })
  });
};


// WEBPACK FOOTER //
// ./packages/cases/lib/events/interaction/Assign.js