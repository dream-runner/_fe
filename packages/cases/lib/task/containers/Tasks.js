'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _reactRouterDom = require('react-router-dom');

var _lodash = require('lodash');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _caseUrl = require('../../caseUrl');

var _caseUrl2 = _interopRequireDefault(_caseUrl);

var _higherOrder = require('../higher-order');

var _components2 = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TasksContainer = function TasksContainer(_ref) {
  var activeTaskId = _ref.activeTaskId,
      caseId = _ref.caseId,
      fetchCase = _ref.fetchCase,
      lastUpdated = _ref.lastUpdated,
      onRefresh = _ref.onRefresh,
      fetchTasks = _ref.fetchTasks,
      style = _ref.style,
      onRefreshTasks = _ref.onRefreshTasks;

  var caze = fetchCase.value;

  var tasksLoaded = !fetchTasks.pending || fetchTasks.value;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      style('case'),
      _react2.default.createElement(
        'h5',
        style('caseTitle'),
        (0, _signavioI18n2.default)('Case')
      ),
      fetchCase.pending && !fetchCase.value && _react2.default.createElement(
        _hints.Hint,
        { inline: true, loading: true },
        (0, _signavioI18n2.default)('Loading case...')
      ),
      fetchCase.rejected && _react2.default.createElement(
        _hints.Hint,
        { inline: true, danger: true },
        (0, _signavioI18n2.default)('Could not load the case for the following reason: __reason__', {
          reason: fetchCase.reason
        })
      ),
      caze && _react2.default.createElement(
        _reactRouterDom.Link,
        { to: (0, _caseUrl2.default)({ caseId: caseId }) },
        caze.name
      )
    ),
    tasksLoaded && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_components2.TasksTree, {
        activeTaskId: activeTaskId,
        onStatusChange: fetchCase,
        tasks: fetchTasks.value,
        readOnly: caze && caze.closed
      }),
      _react2.default.createElement(
        'div',
        style('lastUpdated'),
        _react2.default.createElement(_components2.LastUpdated, {
          lastUpdated: lastUpdated,
          onRefreshTasks: onRefreshTasks,
          pending: fetchTasks.pending
        })
      )
    ),
    !tasksLoaded && _react2.default.createElement(
      _components.List,
      null,
      (0, _lodash.range)(7).map(function (index) {
        return _react2.default.createElement(_tiles.PlaceholderTile, { key: index, withHeader: true });
      })
    )
  );
};
exports.default = (0, _recompose.compose)(_higherOrder.withAutoRefreshTasks, (0, _effektifApi.connect)(function (_ref2) {
  var caseId = _ref2.caseId;
  return {
    fetchCase: {
      type: _effektifApi.types.CASE,
      id: caseId
    }
  };
}), (0, _styles.defaultStyle)(function (_ref3) {
  var font = _ref3.font,
      padding = _ref3.padding,
      color = _ref3.color;
  return {
    case: {
      padding: padding.large
    },

    caseTitle: {
      fontFamily: font.family.normal,
      color: color.mono.dark,

      paddingBottom: padding.normal
    },

    lastUpdated: {
      textAlign: 'center',

      marginTop: padding.small
    }
  };
}))(TasksContainer);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/containers/Tasks.js