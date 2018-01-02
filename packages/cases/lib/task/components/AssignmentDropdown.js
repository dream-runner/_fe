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

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TaskAssignment(props) {
  var disabled = props.disabled,
      readOnly = props.readOnly,
      children = props.children,
      showWarning = props.showWarning,
      open = props.open,
      style = props.style,
      onAcceptWarning = props.onAcceptWarning,
      onDismissWarning = props.onDismissWarning,
      onUserSelect = props.onUserSelect,
      onGroupSelect = props.onGroupSelect,
      onFilter = props.onFilter,
      onUnassignGroup = props.onUnassignGroup,
      onUnassignUser = props.onUnassignUser,
      onToggle = props.onToggle,
      user = props.user,
      task = props.task;
  var assigneeId = task.assigneeId,
      assigneeGroupId = task.assigneeGroupId;


  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      _components.DropDown,
      {
        hideToggleButton: true,
        disabled: readOnly || disabled,
        toggle: children,
        open: open,
        onToggle: onToggle
      },
      open && !readOnly && open && _react2.default.createElement(_workflowOrganizations.UserSelect, {
        hideTrigger: true,
        registeredOnly: true,
        autoFocus: true,
        selfOnTop: true,
        'static': true,
        showGroups: true,
        groupId: assigneeGroupId || null,
        onUserSelect: onUserSelect,
        onGroupSelect: onGroupSelect,
        controls: (assigneeId || assigneeGroupId) && _react2.default.createElement(
          _buttons.RemoveButton,
          {
            light: true,
            block: true,
            onClick: assigneeId ? onUnassignUser : onUnassignGroup,
            className: 'unassign'
          },
          assigneeId ? (0, _signavioI18n2.default)('Unassign') : (0, _signavioI18n2.default)('Remove group assignment')
        ),
        filter: onFilter,
        candidateIds: task.candidateIds,
        candidateGroupIds: task.candidateGroupIds,
        defaultSelectionIndex: getDefaultSelectionIndex(assigneeId, user),
        placeholder: (0, _signavioI18n2.default)('Type user, group name or email')
      })
    ),
    showWarning && _react2.default.createElement(
      _components.Confirm,
      {
        danger: true,
        title: (0, _signavioI18n2.default)('You will lose access if you change the assignment'),
        confirmText: (0, _signavioI18n2.default)('Change assignment'),
        onCancel: onDismissWarning,
        onConfirm: onAcceptWarning
      },
      _react2.default.createElement(
        _hints.Hint,
        { warning: true },
        (0, _signavioI18n2.default)('Are you sure you want to change the assignment of this task? You will not ' + 'be able to reassign this task afterwards and this action cannot be undone.')
      )
    )
  );
}

var filterCurrentAssignee = function filterCurrentAssignee(results, assignee) {
  return results.map(function (result) {
    if (result.entity.id !== assignee.id) {
      return result;
    }

    return (0, _extends3.default)({}, result, { disabled: true });
  });
};

var getDefaultSelectionIndex = function getDefaultSelectionIndex(assigneeId, currentUser) {
  if (!assigneeId) {
    return 0;
  }

  if (assigneeId !== currentUser.id) {
    return 0;
  }

  return null;
};

exports.default = (0, _recompose.compose)(_effektifApi.withUser, (0, _recompose.withState)('userAssignee', 'setUserAssignee', null), (0, _recompose.withState)('groupAssignee', 'setGroupAssignee', null), (0, _recompose.withState)('open', 'toggleOpen', false), (0, _recompose.withState)('showWarning', 'setShowWarning', false), (0, _recompose.withHandlers)({
  onToggle: function onToggle(_ref) {
    var toggleOpen = _ref.toggleOpen,
        open = _ref.open;
    return function () {
      return toggleOpen(!open);
    };
  },
  onDismissWarning: function onDismissWarning(_ref2) {
    var setUserAssignee = _ref2.setUserAssignee,
        setGroupAssignee = _ref2.setGroupAssignee,
        setShowWarning = _ref2.setShowWarning;
    return function () {
      setUserAssignee(null);
      setGroupAssignee(null);
      setShowWarning(false);
    };
  }
}), (0, _recompose.withHandlers)({
  onAcceptWarning: function onAcceptWarning(_ref3) {
    var userAssignee = _ref3.userAssignee,
        groupAssignee = _ref3.groupAssignee,
        task = _ref3.task,
        toggleOpen = _ref3.toggleOpen,
        onChange = _ref3.onChange,
        onDismissWarning = _ref3.onDismissWarning;
    return function () {
      if (userAssignee) {
        onChange((0, _utils.assignTo)(task, userAssignee));
      }

      if (groupAssignee) {
        onChange((0, _extends3.default)({}, task, {
          assignee: null,
          assigneeId: null,
          assigneeGroup: groupAssignee,
          assigneeGroupId: groupAssignee.id
        }));
      }

      if (!userAssignee && !groupAssignee) {
        onChange((0, _utils.assignTo)(task, null));
      }

      onDismissWarning();
      toggleOpen(false);
    };
  },
  onUnassignUser: function onUnassignUser(_ref4) {
    var task = _ref4.task,
        onChange = _ref4.onChange,
        toggleOpen = _ref4.toggleOpen,
        setShowWarning = _ref4.setShowWarning;
    return function () {
      toggleOpen(false);

      if ((0, _utils.isTaskReadOnly)(task) && !(0, _utils.willUserHaveAccess)(task, task.assignee)) {
        setShowWarning(true);
        return;
      }

      onChange((0, _utils.assignTo)(task, null));
    };
  },
  onUnassignGroup: function onUnassignGroup(_ref5) {
    var onChange = _ref5.onChange,
        task = _ref5.task,
        toggleOpen = _ref5.toggleOpen,
        setShowWarning = _ref5.setShowWarning;
    return function () {
      toggleOpen(false);

      if ((0, _utils.isTaskReadOnly)(task)) {
        setShowWarning(true);
        return;
      }

      onChange((0, _extends3.default)({}, task, {
        assigneeGroup: null,
        assigneeGroupId: null
      }));
    };
  },
  onUserSelect: function onUserSelect(_ref6) {
    var onChange = _ref6.onChange,
        task = _ref6.task,
        user = _ref6.user,
        setUserAssignee = _ref6.setUserAssignee,
        setShowWarning = _ref6.setShowWarning,
        toggleOpen = _ref6.toggleOpen;
    return function (newUser) {
      toggleOpen(false);

      if ((0, _utils.isTaskReadOnly)(task) && newUser.id !== user.id) {
        setUserAssignee(newUser);
        setShowWarning(true);
        return;
      }

      onChange((0, _utils.assignTo)(task, newUser));
    };
  },
  onGroupSelect: function onGroupSelect(_ref7) {
    var onChange = _ref7.onChange,
        task = _ref7.task,
        user = _ref7.user,
        setGroupAssignee = _ref7.setGroupAssignee,
        setShowWarning = _ref7.setShowWarning,
        toggleOpen = _ref7.toggleOpen;
    return function (group) {
      toggleOpen(false);

      if ((0, _utils.isGroupAssignmentIrreversible)(task, user, group.id)) {
        setGroupAssignee(group);
        setShowWarning(true);
        return;
      }

      onChange((0, _extends3.default)({}, task, {
        assignee: null,
        assigneeId: null,
        assigneeGroup: group,
        assigneeGroupId: group.id
      }));
    };
  },
  onFilter: function onFilter(_ref8) {
    var task = _ref8.task;
    return function (results) {
      var assignee = task.assignee,
          assigneeGroup = task.assigneeGroup;


      if (assignee) {
        return filterCurrentAssignee(results, assignee);
      }

      if (assigneeGroup) {
        return filterCurrentAssignee(results, assigneeGroup);
      }

      return results;
    };
  }
}), (0, _components.omitProps)(['toggleOpen', 'userAssignee', 'groupAssignee', 'setUserAssignee', 'setGroupAssignee']), (0, _styles.defaultStyle)())(TaskAssignment);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/AssignmentDropdown.js