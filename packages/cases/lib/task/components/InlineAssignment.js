'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _AssignmentDropdown = require('./AssignmentDropdown');

var _AssignmentDropdown2 = _interopRequireDefault(_AssignmentDropdown);

var _Candidates = require('./Candidates');

var _Candidates2 = _interopRequireDefault(_Candidates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InlineAssignment(_ref) {
  var disabled = _ref.disabled,
      readOnly = _ref.readOnly,
      task = _ref.task,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['disabled', 'readOnly', 'task', 'style']);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style),
    _react2.default.createElement(
      _AssignmentDropdown2.default,
      (0, _extends3.default)({
        task: task,
        readOnly: readOnly,
        disabled: disabled,
        toggleIcon: null
      }, rest),
      !task.assigneeId && task.candidates.count === 0 && _react2.default.createElement(_buttons.IconButton, (0, _extends3.default)({}, style('icon'), {
        icon: 'user',
        disabled: readOnly || disabled
      })),
      !task.assigneeId && task.candidates.count >= 1 && _react2.default.createElement(_Candidates2.default, {
        condensed: true,
        users: task.candidates.items,
        totalCount: task.candidates.count,
        disabled: disabled
      }),
      task.assigneeId && _react2.default.createElement(_workflowOrganizations.UserAvatar, { value: task.assigneeId, disabled: disabled })
    )
  );
}

var styled = (0, _styles.defaultStyle)({
  cursor: 'pointer',

  menu: {
    width: 250
  },

  icon: (0, _extends3.default)({
    opacity: 0.5

  }, _styles.utils.transition('opacity'), {

    ':hover': {
      opacity: 1
    }
  }),

  '&readOnly': {
    cursor: null
  }
}, function (_ref2) {
  var readOnly = _ref2.readOnly;
  return {
    '&readOnly': readOnly
  };
});

exports.default = styled(InlineAssignment);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/InlineAssignment.js