'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MilestoneEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MilestoneEvent(_ref) {
  var event = _ref.event;
  var milestone = event.milestone,
      pastMilestone = event.pastMilestone;


  return _react2.default.createElement(
    _workflowEvents2.default,
    {
      important: true,
      event: event,
      iconSet: 'fontAwesome',
      icon: 'flag-o',
      title: (0, _signavioI18n2.default)('Milestone: __milestone__', {
        milestone: milestone || _react2.default.createElement(
          _hints.Hint,
          { inline: true },
          (0, _signavioI18n2.default)('Unnamed milestone')
        )
      })
    },
    pastMilestone && _react2.default.createElement(
      _components.List,
      null,
      _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        label: (0, _signavioI18n2.default)('Current milestone'),
        value: milestone || null,
        type: (0, _effektifFields.textType)()
      }),
      _react2.default.createElement(_effektifFields.LabeledField, {
        readOnly: true,
        label: (0, _signavioI18n2.default)('Past milestone'),
        value: pastMilestone,
        type: (0, _effektifFields.textType)()
      })
    )
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/integrations/Milestone.js