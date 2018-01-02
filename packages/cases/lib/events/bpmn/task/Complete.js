'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _workflowForms = require('@signavio/workflow-forms');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TaskCompleteEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var actor = event.actor,
      task = event.task,
      caseId = event.caseId,
      form = event.form;


  return _react2.default.createElement(
    _workflowEvents2.default,
    (0, _extends3.default)({}, rest, {
      important: true,
      event: event,
      icon: 'check',
      title: actor ? (0, _signavioI18n2.default)('__user__ completed __task__', {
        user: _effektifApi.userUtils.name(actor),
        task: _react2.default.createElement(_components.TaskLink, { task: task, caseId: caseId })
      }) : (0, _signavioI18n2.default)('__task__ was completed', {
        task: _react2.default.createElement(_components.TaskLink, { task: task, caseId: caseId })
      })
    }),
    form && _react2.default.createElement(_workflowForms.Form, (0, _extends3.default)({ readOnly: true, hideDoneButton: true }, form))
  );
}

exports.default = TaskCompleteEvent;


// WEBPACK FOOTER //
// ./packages/cases/lib/events/bpmn/task/Complete.js