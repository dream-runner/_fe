'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _AddTask = require('./AddTask');

var _AddTask2 = _interopRequireDefault(_AddTask);

var _TaskTile = require('./TaskTile');

var _TaskTile2 = _interopRequireDefault(_TaskTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubTasks = function SubTasks(_ref) {
  var task = _ref.task,
      style = _ref.style,
      onAdd = _ref.onAdd;
  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      'h4',
      style('title'),
      (0, _signavioI18n2.default)('Subtasks')
    ),
    _react2.default.createElement(
      _components.List,
      null,
      (0, _lodash.map)(task.subtasks, function (subtaskId) {
        return _react2.default.createElement(_TaskTile2.default, { key: subtaskId, taskId: subtaskId });
      })
    ),
    _react2.default.createElement(_AddTask2.default, {
      onAdd: onAdd,
      disabled: !!task.completed,
      disabledHint: (0, _signavioI18n2.default)('This task is completed, so you cannot add any subtasks to it.'),
      placeholder: (0, _signavioI18n2.default)('Add a new subtask'),
      buttonLabel: (0, _signavioI18n2.default)('Add subtask')
    })
  );
};


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var padding = _ref2.padding;
  return {
    title: {
      marginBottom: padding.normal
    }
  };
});

exports.default = styled(SubTasks);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/Subtasks.js