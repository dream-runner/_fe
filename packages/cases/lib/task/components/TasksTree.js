'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _utils = require('../utils');

var _TaskTile = require('./TaskTile');

var _TaskTile2 = _interopRequireDefault(_TaskTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tree = function Tree(_ref) {
  var activeTaskId = _ref.activeTaskId,
      readOnly = _ref.readOnly,
      tasks = _ref.tasks,
      style = _ref.style,
      onStatusChange = _ref.onStatusChange;
  return _react2.default.createElement(
    _components.List,
    null,
    (0, _lodash.map)(tasks, function (task) {
      return (0, _lodash.isEmpty)(task.subtasks) ? _react2.default.createElement(Leaf, {
        key: task.id,
        taskId: task.id,
        active: task.id === activeTaskId,
        readOnly: readOnly,
        onStatusChange: onStatusChange
      }) : _react2.default.createElement(
        _components.Collapsible,
        {
          key: task.id,
          preventToggle: true,
          expanded: (0, _utils.isExpanded)(task, activeTaskId),
          header: _react2.default.createElement(Leaf, {
            key: task.id,
            taskId: task.id,
            active: task.id === activeTaskId,
            readOnly: readOnly,
            onStatusChange: onStatusChange
          })
        },
        _react2.default.createElement(
          'div',
          style('subtasks'),
          _react2.default.createElement(
            _components.List,
            null,
            task.subtasks.map(function (subtaskId) {
              return _react2.default.createElement(Leaf, {
                key: subtaskId,
                taskId: subtaskId,
                active: subtaskId === activeTaskId,
                readOnly: readOnly,
                onStatusChange: onStatusChange
              });
            })
          )
        )
      );
    })
  );
};


var Leaf = function Leaf(_ref2) {
  var taskId = _ref2.taskId,
      readOnly = _ref2.readOnly,
      active = _ref2.active,
      onStatusChange = _ref2.onStatusChange;
  return _react2.default.createElement(
    _tiles.Tile,
    { toolbar: active && _react2.default.createElement(_components.Icon, { iconSet: 'fontAwesome', icon: 'angle-right' }) },
    _react2.default.createElement(_TaskTile2.default, {
      onStatusChange: onStatusChange,
      taskId: taskId,
      readOnly: readOnly
    })
  );
};

var styled = (0, _styles.defaultStyle)(function (_ref3) {
  var padding = _ref3.padding;
  return {
    subtasks: {
      marginLeft: padding.normal,
      marginTop: 1
    }
  };
});

exports.default = styled(Tree);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/TasksTree.js