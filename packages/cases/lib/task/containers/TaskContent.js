'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _workflowAccess = require('@signavio/workflow-access');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components2 = require('../../components');

var _utils = require('../utils');

var _components3 = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TaskContent(_ref) {
  var fetchTask = _ref.fetchTask,
      fields = _ref.fields,
      defaultFields = _ref.defaultFields,
      taskId = _ref.taskId,
      caseId = _ref.caseId,
      user = _ref.user,
      style = _ref.style,
      updateTask = _ref.updateTask,
      onChange = _ref.onChange,
      onComplete = _ref.onComplete,
      onCreateSubtask = _ref.onCreateSubtask;

  if (fetchTask.pending && !fetchTask.value) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading task...')
    );
  }

  if (fetchTask.rejected) {
    return _react2.default.createElement(
      _hints.Hint,
      { danger: true },
      (0, _signavioI18n2.default)('The task could not be loaded for the following reason: __reason__', {
        reason: fetchTask.reason
      })
    );
  }

  var task = fetchTask.value;

  var readOnly = (0, _utils.isTaskReadOnly)(task);

  var rights = (0, _workflowAccess.getRights)(task.access, 'edit');
  var canComplete = (0, _utils.canCompleteTask)(task, user);

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(_components.DocumentTitle, { title: (0, _signavioI18n2.default)('Task - __name__', { name: task.name }) }),
    _react2.default.createElement(
      'div',
      style('contentContainer'),
      _react2.default.createElement(
        'div',
        style('content'),
        _react2.default.createElement(
          _components.Container,
          { fullWidth: true },
          _react2.default.createElement(
            'div',
            style('header'),
            _react2.default.createElement(_components3.Header, { readOnly: readOnly, task: task, onChange: onChange })
          ),
          _react2.default.createElement(
            'div',
            style('details'),
            _react2.default.createElement(_components3.Details, {
              task: task,
              canAssign: (0, _utils.canUserChangeAssignment)(task, user),
              disabled: !(0, _utils.isTaskExecutable)(task),
              readOnly: readOnly,
              onChange: onChange
            })
          ),
          _react2.default.createElement(
            'div',
            style('switchView'),
            _react2.default.createElement(_components2.SwitchViewHeader, { taskId: taskId, caseId: caseId })
          ),
          _react2.default.createElement(_components3.RestrictionsInfo, { task: task }),
          _react2.default.createElement(_components3.TaskDetail, {
            defaultFields: defaultFields,
            fields: fields || (0, _lodash.get)(task, 'form.fields', []),
            onChange: onChange,
            onComplete: onComplete,
            pending: updateTask.pending,
            readOnly: !canComplete,
            task: task
          })
        )
      )
    ),
    !task.parentId && (rights.edit || canComplete) && _react2.default.createElement(
      'div',
      style('subtasks'),
      _react2.default.createElement(_components3.Subtasks, { task: task, onAdd: onCreateSubtask })
    )
  );
}
exports.default = (0, _recompose.compose)(_effektifApi.withUser, (0, _effektifApi.connect)(function (_ref2) {
  var caseId = _ref2.caseId,
      taskId = _ref2.taskId;
  return {
    fetchTask: {
      type: _effektifApi.types.TASK,
      query: {
        id: taskId,
        caseId: caseId
      }
    },
    updateTask: {
      type: _effektifApi.types.TASK,
      method: 'update',
      id: taskId
    },

    addSubtask: {
      query: {
        caseId: caseId
      },
      type: _effektifApi.types.TASK,
      method: 'create'
    }
  };
}), (0, _effektifApi.fulfillRequestThen)({
  addSubtask: function addSubtask(_ref3) {
    var fetchTask = _ref3.fetchTask;
    return fetchTask();
  }
}),
// TODO: the following should be handled on the server
(0, _effektifApi.connect)(function (_ref4) {
  var fetchTask = _ref4.fetchTask,
      taskId = _ref4.taskId;

  var tasksToComplete = [taskId];

  if (fetchTask.value) {
    tasksToComplete = [].concat((0, _toConsumableArray3.default)(tasksToComplete), (0, _toConsumableArray3.default)(fetchTask.value.subtasks || []));
  }

  return (0, _lodash.reduce)(tasksToComplete, function (result, taskId) {
    return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, 'complete_' + taskId, {
      type: _effektifApi.types.TASK_COMPLETE,
      method: 'create'
    }));
  }, {});
}), (0, _recompose.withState)('fields', 'setFields'), (0, _recompose.withState)('defaultFields', 'setDefaultFields'), (0, _recompose.withHandlers)({
  onChange: function onChange(_ref5) {
    var fields = _ref5.fields,
        updateTask = _ref5.updateTask,
        setFields = _ref5.setFields;
    return function (task) {
      setFields((0, _lodash.get)(task, 'form.fields', []));
      updateTask(task);
    };
  },
  onComplete: function onComplete(props) {
    return function (taskId, fields) {
      (0, _lodash.forEach)((0, _lodash.keys)(props), function (key) {
        if (key.indexOf('complete_') === -1) {
          return;
        }

        var complete = props[key];

        var toCompleteId = key.replace('complete_', '');

        complete({
          id: toCompleteId,
          body: toCompleteId === taskId ? fields : []
        });
      });
    };
  },
  onCreateSubtask: function onCreateSubtask(_ref6) {
    var addSubtask = _ref6.addSubtask,
        caseId = _ref6.caseId,
        taskId = _ref6.taskId;
    return function (task) {
      return addSubtask((0, _extends4.default)({}, task, {
        caseId: caseId,
        parentId: taskId
      }));
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        defaultFields = _props.defaultFields,
        fetchTask = _props.fetchTask,
        setDefaultFields = _props.setDefaultFields,
        setFields = _props.setFields;


    var task = fetchTask.value;

    if (!defaultFields && task) {
      setDefaultFields((0, _lodash.get)(task, 'form.fields', []));
    }

    if ((0, _utils.userSwitchedTask)(this.props, nextProps)) {
      setDefaultFields((0, _utils.getFields)(this.props, nextProps));
    }

    if ((0, _utils.shouldRefreshFields)(this.props, nextProps)) {
      setFields((0, _utils.getFields)(this.props, nextProps));
    }
  }
}), (0, _styles.defaultStyle)(function (_ref7) {
  var padding = _ref7.padding,
      color = _ref7.color;
  return {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    height: '100%',

    contentContainer: {
      overflowY: 'auto',

      flex: '1 0 0'
    },

    content: (0, _extends4.default)({
      paddingTop: padding.large,
      paddingBottom: 200

    }, _styles.utils.media.sm({
      marginLeft: '33%'
    })),

    header: {
      maxWidth: 'calc(100% - 200px)',

      marginBottom: padding.normal
    },

    switchView: {
      textAlign: 'right'
    },

    details: {
      marginBottom: padding.large
    },

    subtasks: (0, _extends4.default)({
      flex: '0 1 auto',

      padding: padding.normal,
      maxHeight: '30%',
      overflow: 'auto'

    }, _styles.utils.borderTop(1, 'solid', color.mono.light))
  };
}))(TaskContent);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/containers/TaskContent.js