'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = SubProcessCreateEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SubProcessCreateEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var error = event.error,
      subCaseName = event.subCaseName,
      subCaseId = event.subCaseId;


  return _react2.default.createElement(_workflowEvents.LogEvent, (0, _extends3.default)({}, rest, {
    iconSet: 'fontAwesome',
    markdown: true,
    icon: 'folder-open-o',
    event: event,
    title: error ? (0, _signavioI18n2.default)('Sub case not started') : (0, _signavioI18n2.default)('Sub case __case__ started', {
      case: _react2.default.createElement(
        _components.CaseLink,
        { caseId: subCaseId },
        subCaseName
      )
    })
  }));
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/bpmn/subprocess/Create.js