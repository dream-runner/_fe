'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = GoogleAddCalendarEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifFields = require('@signavio/effektif-fields');

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GoogleAddCalendarEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var _event$links = event.links,
      links = _event$links === undefined ? [] : _event$links,
      _event$attendeeIds = event.attendeeIds,
      attendeeIds = _event$attendeeIds === undefined ? [] : _event$attendeeIds,
      _event$emailAttendees = event.emailAttendees,
      emailAttendees = _event$emailAttendees === undefined ? [] : _event$emailAttendees,
      logs = event.logs;


  var link = links[0];

  return _react2.default.createElement(
    _workflowEvents2.default,
    (0, _extends3.default)({}, rest, {
      event: event,
      icon: 'calendar',
      title: !link ? (0, _signavioI18n2.default)('Could not add the event to Google calendar.') : (0, _signavioI18n2.default)('__event__ was added to Google calendar', {
        event: link.name
      })
    }),
    link ? _react2.default.createElement(
      _components.List,
      null,
      _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        label: link.name,
        type: { name: 'link' },
        value: link.url
      }),
      _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        type: { name: 'date', kind: 'datetime' },
        value: event.startDate,
        label: (0, _signavioI18n2.default)('Starts at')
      }),
      _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        type: { name: 'date', kind: 'datetime' },
        value: event.endDate,
        label: (0, _signavioI18n2.default)('Ends at')
      }),
      attendeeIds.length > 0 && _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        type: (0, _effektifFields.listType)(_effektifFields.userType),
        value: attendeeIds,
        label: (0, _signavioI18n2.default)('Attendee', 'Attendees', {
          count: attendeeIds.length
        })
      }),
      emailAttendees.length > 0 && _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        type: (0, _effektifFields.listType)(_effektifFields.emailAddressType),
        value: emailAttendees,
        label: (0, _signavioI18n2.default)('External attendee', 'External attendees', {
          count: emailAttendees.length
        })
      })
    ) : _react2.default.createElement(_effektifFields.Field, { readOnly: true, type: (0, _effektifFields.listType)((0, _effektifFields.textType)()), value: logs.split('\n') })
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/integrations/google/AddCalendarEvent.js