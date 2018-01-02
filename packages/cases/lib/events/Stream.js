'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifApi = require('@signavio/effektif-api');

var _components2 = require('../comments/components');

var _components3 = require('../components');

var _components4 = require('./components');

var _Events = require('./Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Stream(props) {
  var filter = props.filter,
      fetchEvents = props.fetchEvents,
      addEvent = props.addEvent,
      taskId = props.taskId,
      pendingEvent = props.pendingEvent,
      style = props.style,
      onFileAdd = props.onFileAdd,
      onFilter = props.onFilter,
      onComment = props.onComment,
      participants = props.participants;


  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_components2.CommentAdd, {
      onFileAdd: onFileAdd,
      onComment: onComment,
      participants: participants
    }),
    _react2.default.createElement(_components.Divider, { padding: 'normal' }),
    _react2.default.createElement(_components4.Filters, { taskId: taskId, filter: filter, onFilter: onFilter }),
    addEvent.pending && pendingEvent && _react2.default.createElement(_components2.PendingComment, {
      style: style('pendingEvent'),
      comment: pendingEvent
    }),
    fetchEvents.pending && !fetchEvents.value ? _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading events...')
    ) : _react2.default.createElement(_Events2.default, { style: style('events'), events: fetchEvents.value })
  );
}

exports.default = (0, _recompose.compose)(_effektifApi.withUser, (0, _recompose.withState)('filter', 'setFilter', function (_ref) {
  var taskId = _ref.taskId;
  return taskId && { taskId: taskId };
}), (0, _effektifApi.connect)(function (_ref2) {
  var caseId = _ref2.caseId,
      filter = _ref2.filter;
  return {
    fetchEvents: {
      type: _effektifApi.types.CASE_EVENTS,
      query: {
        caseId: caseId,
        filter: filter
      }
    },
    addEvent: {
      type: _effektifApi.types.CASE_EVENT,
      method: 'create'
    }
  };
}), (0, _recompose.withState)('pendingEvent', 'setPendingEvent', null), (0, _recompose.withHandlers)({
  onFileAdd: function onFileAdd(_ref3) {
    var user = _ref3.user,
        caseId = _ref3.caseId,
        addEvent = _ref3.addEvent,
        setPendingEvent = _ref3.setPendingEvent;
    return function (file) {
      var fileAddEvent = {
        type: 'fileAdd',
        fileId: file.id,
        userId: user.id,
        caseId: caseId
      };

      addEvent(fileAddEvent);
      setPendingEvent(fileAddEvent);
    };
  },
  onComment: function onComment(_ref4) {
    var addEvent = _ref4.addEvent,
        user = _ref4.user,
        caseId = _ref4.caseId,
        taskId = _ref4.taskId,
        setPendingEvent = _ref4.setPendingEvent;
    return function (message) {
      var commentAddEvent = {
        actor: user,
        type: 'commentAdd',
        userId: user.id,
        message: message,
        caseId: caseId,
        taskId: taskId
      };

      addEvent(commentAddEvent);
      setPendingEvent(commentAddEvent);
    };
  },
  onFilter: function onFilter(_ref5) {
    var setFilter = _ref5.setFilter;
    return function (filter) {
      return setFilter(filter);
    };
  }
}), (0, _components3.withPeriodicAction)(function (_ref6) {
  var fetchEvents = _ref6.fetchEvents;
  return fetchEvents();
}), (0, _recompose.lifecycle)({
  componentDidUpdate: function componentDidUpdate(_ref7) {
    var prevFilter = _ref7.filter,
        prevEvent = _ref7.addEvent,
        onRestartAction = _ref7.onRestartAction;
    var _props = this.props,
        filter = _props.filter,
        fetchEvents = _props.fetchEvents,
        addEvent = _props.addEvent;


    var commentAdded = prevEvent.pending && !addEvent.pending;

    if ((0, _lodash.isEqual)(filter, prevFilter) && !commentAdded) {
      return;
    }

    onRestartAction();

    fetchEvents();
  }
}), (0, _styles.defaultStyle)(function (_ref8) {
  var padding = _ref8.padding;
  return {
    events: {
      marginTop: padding.large
    },

    pendingEvent: {
      marginTop: padding.large
    },

    '&eventPending': {
      events: {
        marginTop: null
      }
    }
  };
}, function (_ref9) {
  var addEvent = _ref9.addEvent;
  return {
    eventPending: addEvent.pending
  };
}), (0, _components.omitProps)(['onEvent', 'user', 'caseId']))(Stream);


// WEBPACK FOOTER //
// ./packages/cases/lib/events/Stream.js