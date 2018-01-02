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

var _lodash = require('lodash');

var _effektifApi = require('@signavio/effektif-api');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('../../components');

var _utils = require('../utils');

var _Candidates = require('./Candidates');

var _Candidates2 = _interopRequireDefault(_Candidates);

var _Assignment = require('./Assignment');

var _Assignment2 = _interopRequireDefault(_Assignment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Details(_ref) {
  var canAssign = _ref.canAssign,
      disabled = _ref.disabled,
      style = _ref.style,
      user = _ref.user,
      readOnly = _ref.readOnly,
      task = _ref.task,
      onChange = _ref.onChange,
      onDueDateChange = _ref.onDueDateChange,
      onTakeTask = _ref.onTakeTask;

  var iAmCandidate = (0, _lodash.some)(task.candidates.items, { id: user.id });
  var hasCandidates = (0, _lodash.get)(task, 'candidates.count', 0) > 0;
  var showAssignmentButton = !(0, _utils.hasAssignee)(task) && canAssign && (iAmCandidate || !hasCandidates);
  var showCandidates = hasCandidates && !(0, _utils.hasAssignee)(task);

  return _react2.default.createElement(
    'table',
    null,
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        showAssignmentButton && _react2.default.createElement(
          'th',
          style('title'),
          iAmCandidate ? (0, _signavioI18n2.default)('You are a candidate') : (0, _signavioI18n2.default)('You can take this task')
        ),
        showCandidates && _react2.default.createElement(
          'th',
          style('title'),
          iAmCandidate ? (0, _signavioI18n2.default)('Additional candidates') : (0, _signavioI18n2.default)('Candidates')
        ),
        _react2.default.createElement(
          'th',
          style('title'),
          (0, _signavioI18n2.default)('Current task assignee')
        ),
        _react2.default.createElement(
          'th',
          style('title'),
          (0, _signavioI18n2.default)('Task due date')
        )
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      _react2.default.createElement(
        'tr',
        null,
        showAssignmentButton && _react2.default.createElement(
          'td',
          style('content'),
          _react2.default.createElement(
            _buttons.TextButton,
            {
              small: true,
              primary: iAmCandidate,
              disabled: !canAssign,
              onClick: onTakeTask
            },
            (0, _signavioI18n2.default)('Take this task')
          )
        ),
        showCandidates && _react2.default.createElement(
          'td',
          style('content'),
          _react2.default.createElement(_Candidates2.default, {
            circularAvatars: true,
            small: true,
            users: (0, _lodash.reject)(task.candidates.items, { id: user.id }),
            totalCount: task.candidates.totalCount
          })
        ),
        _react2.default.createElement(
          'td',
          style('content'),
          _react2.default.createElement(_Assignment2.default, {
            disabled: disabled,
            onChange: onChange,
            readOnly: !canAssign,
            task: task
          })
        ),
        _react2.default.createElement(
          'td',
          style('content'),
          _react2.default.createElement(_components.DueDateSelect, {
            onChange: onDueDateChange,
            readOnly: readOnly || disabled,
            value: task.dueDate
          })
        )
      )
    )
  );
}
exports.default = (0, _recompose.compose)(_effektifApi.withUser, (0, _recompose.withHandlers)({
  onDueDateChange: function onDueDateChange(_ref2) {
    var onChange = _ref2.onChange,
        task = _ref2.task;
    return function (dueDate) {
      onChange((0, _extends3.default)({}, task, {
        dueDate: dueDate
      }));
    };
  },
  onTakeTask: function onTakeTask(_ref3) {
    var onChange = _ref3.onChange,
        task = _ref3.task,
        user = _ref3.user;
    return function () {
      onChange((0, _utils.assignTo)(task, user));
    };
  }
}), (0, _styles.defaultStyle)(function (_ref4) {
  var padding = _ref4.padding,
      font = _ref4.font,
      color = _ref4.color;
  return {
    title: {
      color: color.mono.dark,

      fontSize: font.size.form,
      fontWeight: font.weight.light,

      paddingBottom: padding.small,
      paddingRight: padding.large
    },

    content: {
      paddingRight: padding.normal,

      verticalAlign: 'top'
    }
  };
}))(Details);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/Details.js