'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IntermediateLinkEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IntermediateLinkEvent(_ref) {
  var event = _ref.event;
  var error = event.error,
      subCaseName = event.subCaseName,
      subCaseId = event.subCaseId;


  return _react2.default.createElement(_workflowEvents.LogEvent, {
    event: event,
    markdown: true,
    iconSet: 'fontAwesome',
    icon: 'folder-open-o',
    title: error ? (0, _signavioI18n2.default)('Case not started') : (0, _signavioI18n2.default)('Case __subCaseName__ started', {
      subCaseName: _react2.default.createElement(
        _components.CaseLink,
        { caseId: subCaseId },
        subCaseName
      )
    })
  });
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/bpmn/events/IntermediateLink.js