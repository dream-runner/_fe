'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _AssignmentDropdown = require('./AssignmentDropdown');

var _AssignmentDropdown2 = _interopRequireDefault(_AssignmentDropdown);

var _AssignmentToggle = require('./AssignmentToggle');

var _AssignmentToggle2 = _interopRequireDefault(_AssignmentToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TaskAssignment(_ref) {
  var disabled = _ref.disabled,
      readOnly = _ref.readOnly,
      task = _ref.task,
      style = _ref.style,
      onChange = _ref.onChange;
  var assignee = task.assignee,
      assigneeGroup = task.assigneeGroup;


  return _react2.default.createElement(
    _AssignmentDropdown2.default,
    {
      disabled: disabled,
      onChange: onChange,
      readOnly: readOnly,
      task: task
    },
    function (open) {
      return _react2.default.createElement(
        _tiles.Tile,
        {
          transparent: true,
          style: style('toggle'),
          toolbar: !readOnly && _react2.default.createElement(_components.Icon, {
            small: true,
            iconSet: 'fontAwesome',
            icon: open ? 'angle-up' : 'angle-down'
          })
        },
        _react2.default.createElement(_AssignmentToggle2.default, {
          assigneeId: assignee,
          assigneeGroupId: assigneeGroup
        })
      );
    }
  );
}

var styled = (0, _styles.defaultStyle)({
  toggle: {
    cursor: 'pointer'
  },

  '&readOnly': {
    toggle: {
      cursor: 'default'
    }
  }
}, function (_ref2) {
  var readOnly = _ref2.readOnly;
  return {
    '&readOnly': readOnly
  };
});

exports.default = styled(TaskAssignment);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/Assignment.js