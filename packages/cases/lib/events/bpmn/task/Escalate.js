'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = TaskEscalateEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _effektifApi = require('@signavio/effektif-api');

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _components2 = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TaskEscalateEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var assignee = event.assignee,
      task = event.task,
      caseId = event.caseId,
      candidates = event.candidates,
      candidateGroups = event.candidateGroups;


  return _react2.default.createElement(
    _workflowEvents2.default,
    (0, _extends3.default)({}, rest, {
      event: event,
      icon: 'notification',
      title: assignee ? (0, _signavioI18n2.default)('__task__ was escalated to __user__', {
        task: _react2.default.createElement(_components2.TaskLink, { task: task, caseId: caseId }),
        user: _effektifApi.userUtils.name(assignee)
      }) : (0, _signavioI18n2.default)('__task__ was escalated', {
        task: _react2.default.createElement(_components2.TaskLink, { task: task, caseId: caseId })
      })
    }),
    candidateGroups && _react2.default.createElement(
      _components.List,
      null,
      _react2.default.createElement(_components.Divider, { title: (0, _signavioI18n2.default)('Groups') }),
      candidateGroups.map(function (group) {
        return _react2.default.createElement(
          _tiles.TextTile,
          { key: group.id, icon: 'group' },
          group.name
        );
      })
    ),
    candidates && _react2.default.createElement(
      _components.List,
      null,
      _react2.default.createElement(_components.Divider, { title: (0, _signavioI18n2.default)('Users') }),
      candidates.map(function (candidate) {
        return _react2.default.createElement(
          _workflowOrganizations.UserTile,
          { key: candidate.id, user: candidate },
          _effektifApi.userUtils.name(candidate)
        );
      })
    )
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/bpmn/task/Escalate.js