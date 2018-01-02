'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _fp = require('lodash/fp');

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifApi = require('@signavio/effektif-api');

var _tasks = require('./tasks');

var controlTasks = _interopRequireWildcard(_tasks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControlTasks = function ControlTasks(_ref) {
  var tasks = _ref.tasks,
      style = _ref.style,
      caseId = _ref.caseId,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['tasks', 'style', 'caseId']);
  return _react2.default.createElement(
    _components.List,
    null,
    tasks.map(function (task) {
      var Task = controlTasks[task.type];
      if (!Task) {
        return null;
      }

      return _react2.default.createElement(Task, (0, _extends3.default)({ key: task.id, caseId: caseId }, task, rest));
    })
  );
};


var filterByType = function filterByType(types) {
  return function (tasks) {
    return (0, _lodash.filter)(tasks, function (task) {
      return (0, _lodash.includes)(types, task.type);
    });
  };
};

var filterErrors = filterByType(['activityError', 'configurationError']);
var filterTimers = filterByType(['intermediateTimer']);
var filterSubProcesses = filterByType(['subProcess']);
var filterSignavioStateChanages = filterByType(['signavioStateChange']);

var sortSubProcess = (0, _fp.sortBy)(function (task) {
  return task.calledCaseName;
});
var sortIntermediateTimer = (0, _fp.sortBy)(function (task) {
  return (0, _extensions.moment)(task.executionTime);
});
var sortActivityError = (0, _fp.sortBy)(function (task) {
  return (0, _extensions.moment)(task.time);
});
var sortSignavioStateChanges = (0, _fp.sortBy)(function (task) {
  return (0, _extensions.moment)(task.time);
});

var processErrors = (0, _recompose.compose)(sortActivityError, filterErrors);
var processTimers = (0, _recompose.compose)(sortIntermediateTimer, filterTimers);
var processSubProcesses = (0, _recompose.compose)(sortSubProcess, filterSubProcesses);
var processSignavioStateChanges = (0, _recompose.compose)(sortSignavioStateChanges, filterSignavioStateChanages);

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function () {
  return {
    addTaskAction: {
      method: 'create',
      type: _effektifApi.types.CONTROL_TASK_ACTION
    }
  };
}), (0, _recompose.withHandlers)({
  onCreateAction: function onCreateAction(_ref2) {
    var addTaskAction = _ref2.addTaskAction,
        caseId = _ref2.caseId;
    return function (_ref3) {
      var id = _ref3.id,
          body = _ref3.body;

      addTaskAction({
        body: body,
        caseId: caseId,
        controlTaskId: id
      });
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref4) {
    var addTaskAction = _ref4.addTaskAction;

    if (this.props.addTaskAction.pending && !addTaskAction.pending) {
      this.props.onActionSuccess();
    }
  }
}), (0, _recompose.withProps)(function (_ref5) {
  var tasks = _ref5.tasks;
  return {
    tasks: [].concat((0, _toConsumableArray3.default)(processErrors(tasks)), (0, _toConsumableArray3.default)(processTimers(tasks)), (0, _toConsumableArray3.default)(processSubProcesses(tasks)), (0, _toConsumableArray3.default)(processSignavioStateChanges(tasks)))
  };
}), (0, _styles.defaultStyle)(function (_ref6) {
  var padding = _ref6.padding;
  return {
    marginTop: padding.large,

    title: {
      marginBottom: padding.normal
    },

    list: {
      entry: {
        marginTop: padding.normal
      }
    }
  };
}))(ControlTasks);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/ControlTasks.js