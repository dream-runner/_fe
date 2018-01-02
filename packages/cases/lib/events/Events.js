'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _recompose = require('recompose');

var _workflowEvents = require('@signavio/workflow-events');

var _bpmn = require('./bpmn');

var _bpmn2 = _interopRequireDefault(_bpmn);

var _case = require('./case');

var _case2 = _interopRequireDefault(_case);

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

var _integrations = require('./integrations');

var _integrations2 = _interopRequireDefault(_integrations);

var _interaction = require('./interaction');

var _interaction2 = _interopRequireDefault(_interaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventTypes = (0, _extends3.default)({}, _bpmn2.default, _case2.default, _engine2.default, _integrations2.default, _interaction2.default);
exports.default = (0, _recompose.mapProps)(function (_ref) {
  var events = _ref.events,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['events']);
  return (0, _extends3.default)({}, rest, {

    events: events.map(function (_ref2) {
      var user = _ref2.user,
          event = (0, _objectWithoutProperties3.default)(_ref2, ['user']);
      return (0, _extends3.default)({}, event, {

        actor: user
      });
    })
  });
})((0, _workflowEvents.createEventList)(eventTypes));


// WEBPACK FOOTER //
// ./packages/cases/lib/events/Events.js