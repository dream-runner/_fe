'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = TaskCreateEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _effektifApi = require('@signavio/effektif-api');

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TaskCreateEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var actor = event.actor,
      task = event.task,
      caseId = event.caseId;


  return _react2.default.createElement(_workflowEvents2.default, (0, _extends3.default)({}, rest, {
    event: event,
    icon: 'plus',
    title: actor ? (0, _signavioI18n2.default)('__user__ created __task__', {
      user: _effektifApi.userUtils.name(actor),
      task: _react2.default.createElement(_components.TaskLink, { task: task, caseId: caseId })
    }) : (0, _signavioI18n2.default)('__task__ was created', {
      task: _react2.default.createElement(_components.TaskLink, { task: task, caseId: caseId })
    })
  }));
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/bpmn/task/Create.js