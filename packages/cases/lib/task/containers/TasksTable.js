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

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TasksTableContainer = function TasksTableContainer(_ref) {
  var onCreate = _ref.onCreate,
      onStatusChange = _ref.onStatusChange,
      disabled = _ref.disabled,
      style = _ref.style,
      fetchCase = _ref.fetchCase;
  var tasks = fetchCase.value.tasks;


  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_components.TasksTable, {
      readOnly: disabled,
      taskIds: tasks,
      onStatusChange: onStatusChange
    }),
    _react2.default.createElement(_components.AddTask, {
      onAdd: onCreate,
      disabled: !!disabled,
      disabledHint: (0, _signavioI18n2.default)('This case is completed, so you cannot add any tasks to it.'),
      placeholder: (0, _signavioI18n2.default)('Add a new task'),
      buttonLabel: (0, _signavioI18n2.default)('Add task')
    })
  );
};
exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref2) {
  var caseId = _ref2.caseId;
  return {
    createTask: {
      type: _effektifApi.types.TASK,
      method: 'create'
    },
    fetchCase: {
      id: caseId,
      type: _effektifApi.types.CASE
    }
  };
}), (0, _recompose.withHandlers)({
  onCreate: function onCreate(_ref3) {
    var caseId = _ref3.caseId,
        createTask = _ref3.createTask;
    return function (task) {
      return createTask((0, _extends3.default)({}, task, {
        caseId: caseId
      }));
    };
  },
  onStatusChange: function onStatusChange(_ref4) {
    var fetchCase = _ref4.fetchCase;
    return function () {
      return fetchCase();
    };
  }
}), (0, _effektifApi.fulfillRequestThen)({
  createTask: function createTask(_ref5) {
    var fetchCase = _ref5.fetchCase;
    return fetchCase();
  }
}))(TasksTableContainer);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/containers/TasksTable.js