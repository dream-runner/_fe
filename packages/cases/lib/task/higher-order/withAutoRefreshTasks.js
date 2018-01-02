'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withAutoRefreshTasksHOC;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _effektifApi = require('@signavio/effektif-api');

var _components2 = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withAutoRefreshTasksHOC(WrappedComponent) {
  var withAutoRefreshTasks = function withAutoRefreshTasks(props) {
    return _react2.default.createElement(WrappedComponent, props);
  };

  return (0, _recompose.compose)(_reactRouter.withRouter, (0, _effektifApi.connect)(function (_ref) {
    var caseId = _ref.caseId,
        match = _ref.match;
    return {
      fetchTasks: {
        type: _effektifApi.types.TASKS,
        query: {
          caseId: match.params.caseId || caseId
        }
      }
    };
  }), (0, _recompose.withState)('lastUpdated', 'setLastUpdated', null), (0, _recompose.withHandlers)({
    onRefreshTasks: function onRefreshTasks(_ref2) {
      var fetchTasks = _ref2.fetchTasks;
      return function () {
        fetchTasks();
      };
    }
  }), (0, _components2.withPeriodicAction)(function (_ref3) {
    var fetchTasks = _ref3.fetchTasks;
    return fetchTasks();
  }), (0, _effektifApi.fulfillRequestThen)({
    fetchTasks: function fetchTasks(_ref4) {
      var setLastUpdated = _ref4.setLastUpdated;
      return setLastUpdated((0, _extensions.moment)());
    }
  }), (0, _components.omitProps)('setLastUpdated'))(withAutoRefreshTasks);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/higher-order/withAutoRefreshTasks.js