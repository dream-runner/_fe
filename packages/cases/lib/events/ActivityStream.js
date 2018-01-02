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

var _effektifApi = require('@signavio/effektif-api');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('../components');

var _components2 = require('./components');

var _Events = require('./Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFilters = function getFilters() {
  return [{
    data: { type: 'document' },
    name: (0, _signavioI18n2.default)('documents')
  }, {
    data: { type: 'form' },
    name: (0, _signavioI18n2.default)('forms')
  }];
};

var ActivityStream = function ActivityStream(_ref) {
  var filter = _ref.filter,
      fetchEvents = _ref.fetchEvents,
      taskId = _ref.taskId,
      style = _ref.style,
      onFilter = _ref.onFilter;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_components2.Filters, {
      filter: filter,
      filters: getFilters(),
      onFilter: onFilter,
      taskId: taskId
    }),
    fetchEvents.pending && !fetchEvents.value ? _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading history...')
    ) : _react2.default.createElement(_Events2.default, {
      style: style('events'),
      events: (0, _lodash.reject)(fetchEvents.value, { type: 'commentAdd' })
    })
  );
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('filter', 'setFilter', function (_ref2) {
  var taskId = _ref2.taskId;
  return taskId && { taskId: taskId };
}), (0, _effektifApi.connect)(function (_ref3) {
  var caseId = _ref3.caseId,
      filter = _ref3.filter;
  return {
    fetchEvents: {
      type: _effektifApi.types.CASE_EVENTS,
      query: {
        caseId: caseId,
        filter: filter
      }
    }
  };
}), (0, _recompose.withHandlers)({
  onFilter: function onFilter(_ref4) {
    var setFilter = _ref4.setFilter;
    return function (filter) {
      return setFilter(filter);
    };
  }
}), (0, _components.withPeriodicAction)(function (_ref5) {
  var fetchEvents = _ref5.fetchEvents;
  return fetchEvents;
}), (0, _styles.defaultStyle)(function (_ref6) {
  var padding = _ref6.padding;
  return {
    events: {
      marginTop: padding.large
    }
  };
}))(ActivityStream);


// WEBPACK FOOTER //
// ./packages/cases/lib/events/ActivityStream.js