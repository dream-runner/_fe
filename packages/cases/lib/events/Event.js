'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = Event;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var events = (0, _extends3.default)({}, _bpmn2.default, _case2.default, _engine2.default, _integrations2.default, _interaction2.default);

function Event(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var type = event.type;


  var EventComponent = events[type];

  if (!EventComponent) {
    console.error('Could not render event for type ' + type + '.');

    return null;
  }

  return _react2.default.createElement(EventComponent, (0, _extends3.default)({}, rest, { event: event }));
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/Event.js