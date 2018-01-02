'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _workflowEvents = require('@signavio/workflow-events');

var _workflow = require('./workflow');

var _workflow2 = _interopRequireDefault(_workflow);

var _generator = require('./generator');

var _generator2 = _interopRequireDefault(_generator);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _organization = require('./organization');

var _organization2 = _interopRequireDefault(_organization);

var _license = require('./license');

var _license2 = _interopRequireDefault(_license);

var _licenses = require('./licenses');

var _licenses2 = _interopRequireDefault(_licenses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = (0, _extends3.default)({}, _workflow2.default, _user2.default, _organization2.default, _licenses2.default, _license2.default, _generator2.default);


var EventList = (0, _workflowEvents.createEventList)(events);

function Events(_ref) {
  var fetchEvents = _ref.fetchEvents,
      style = _ref.style;

  if (fetchEvents.pending) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading events...')
    );
  }

  if (fetchEvents.rejected) {
    return _react2.default.createElement(
      _hints.Hint,
      { warning: true },
      fetchEvents.reason
    );
  }

  return _react2.default.createElement(EventList, { style: style, events: fetchEvents.value });
}

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref2) {
  var filter = _ref2.filter;
  return {
    fetchEvents: {
      type: _effektifApi.types.ADMIN_EVENTS,
      query: filter,
      refresh: true
    }
  };
}), (0, _styles.defaultStyle)(function (_ref3) {
  var padding = _ref3.padding;
  return {
    marginTop: padding.large
  };
}))(Events);


// WEBPACK FOOTER //
// ./packages/admin/lib/events/Events.js