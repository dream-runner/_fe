'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components2 = require('../../events/components');

var _components3 = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Comment(_ref) {
  var caseId = _ref.caseId,
      comment = _ref.comment,
      style = _ref.style;
  var user = comment.user,
      time = comment.time,
      task = comment.task,
      type = comment.type;


  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _workflowOrganizations.UserTile,
      {
        user: user,
        small: true,
        transparent: true,
        toolbar: _react2.default.createElement(_components.Time, { hideIcon: true, time: time })
      },
      type === 'commentAdd' ? (0, _signavioI18n2.default)('__user__ left a comment', {
        user: _effektifApi.userUtils.name(user)
      }) : (0, _signavioI18n2.default)('__user__ uploaded a file', {
        user: _effektifApi.userUtils.name(user)
      })
    ),
    _react2.default.createElement(
      'div',
      style('content'),
      task && _react2.default.createElement(
        'div',
        style('taskLink'),
        type === 'commentAdd' ? (0, _signavioI18n2.default)('This comment was left on __task__', {
          task: _react2.default.createElement(_components2.TaskLink, { task: task, caseId: caseId })
        }) : (0, _signavioI18n2.default)('This file was uploaded on __task__', {
          task: _react2.default.createElement(_components2.TaskLink, { task: task, caseId: caseId })
        })
      ),
      _react2.default.createElement(_components3.CommentContent, { caseId: caseId, comment: comment })
    )
  );
}

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      padding = _ref2.padding,
      font = _ref2.font;
  return {
    taskLink: {
      fontSize: font.size.small,
      marginBottom: padding.small
    },

    content: (0, _extends3.default)({
      marginTop: padding.small,
      padding: padding.small

    }, _styles.utils.border(1, 'solid', color.mono.light), _styles.utils.boxShadow('2px', '2px', 0, color.mono.ultralight))
  };
});

exports.default = styled(Comment);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/containers/Comment.js