'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = CaseCreateEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowForms = require('@signavio/workflow-forms');

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTitle = function getTitle(_ref) {
  var email = _ref.email,
      actor = _ref.actor,
      name = _ref.name;

  var interpolations = { case: name };

  if (email) {
    if (actor) {
      return (0, _signavioI18n2.default)('started __case__ via email', interpolations);
    }

    return (0, _signavioI18n2.default)('__case__ was started via email', interpolations);
  }

  if (actor) {
    return (0, _signavioI18n2.default)('started __case__', interpolations);
  }

  return (0, _signavioI18n2.default)('__case__ was started', interpolations);
};


var getIcon = function getIcon(_ref2) {
  var email = _ref2.email,
      actor = _ref2.actor;

  if (email) {
    return 'envelope';
  }

  if (!actor) {
    return 'folder-open-o';
  }

  return null;
};

function CaseCreateEvent(_ref3) {
  var event = _ref3.event,
      rest = (0, _objectWithoutProperties3.default)(_ref3, ['event']);
  var email = event.email,
      form = event.form,
      actor = event.actor;


  return _react2.default.createElement(
    _workflowEvents2.default,
    (0, _extends3.default)({}, rest, {
      important: true,
      iconSet: !email && 'fontAwesome',
      icon: getIcon(event),
      event: event,
      title: getTitle(event)
    }),
    email && _react2.default.createElement(_components.Mail, { email: email }),
    form && _react2.default.createElement(_workflowForms.Form, (0, _extends3.default)({ readOnly: true, hideDoneButton: true }, form))
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/case/Create.js