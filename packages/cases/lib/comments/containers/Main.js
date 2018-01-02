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

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components2 = require('../components');

var _Comments = require('./Comments');

var _Comments2 = _interopRequireDefault(_Comments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Main(_ref) {
  var addComment = _ref.addComment,
      pendingComment = _ref.pendingComment,
      commentTarget = _ref.commentTarget,
      caseId = _ref.caseId,
      taskId = _ref.taskId,
      style = _ref.style,
      onComment = _ref.onComment,
      onFileAdd = _ref.onFileAdd,
      onTargetChange = _ref.onTargetChange;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      style('commentAdd'),
      _react2.default.createElement(_components2.CommentAdd, { onComment: onComment, onFileAdd: onFileAdd })
    ),
    _react2.default.createElement(
      'div',
      style('commentTarget'),
      _react2.default.createElement(_components.Divider, null),
      _react2.default.createElement(_components2.CommentTarget, {
        value: commentTarget,
        canCommentOnTask: !!taskId,
        onChange: onTargetChange
      })
    ),
    _react2.default.createElement(_components.Divider, null),
    addComment.pending && pendingComment && _react2.default.createElement(_components2.PendingComment, { comment: pendingComment }),
    _react2.default.createElement(
      'div',
      style('comments'),
      _react2.default.createElement(_Comments2.default, {
        caseId: caseId,
        taskId: commentTarget === 'task' ? taskId : undefined
      })
    )
  );
}

exports.default = (0, _recompose.compose)(_effektifApi.withUser, (0, _effektifApi.connect)(function () {
  return {
    addComment: {
      type: _effektifApi.types.COMMENT,
      method: 'create'
    }
  };
}), (0, _recompose.withState)('pendingComment', 'setPendingComment', null), (0, _recompose.withState)('commentTarget', 'setCommentTarget', function (_ref2) {
  var taskId = _ref2.taskId;
  return taskId ? 'task' : 'case';
}), (0, _recompose.withHandlers)({
  onFileAdd: function onFileAdd(_ref3) {
    var addComment = _ref3.addComment,
        caseId = _ref3.caseId,
        taskId = _ref3.taskId,
        user = _ref3.user,
        commentTarget = _ref3.commentTarget,
        setPendingComment = _ref3.setPendingComment;
    return function (file) {
      var fileAddComment = {
        type: 'fileAdd',
        fileId: file.id,
        userId: user.id,
        user: user,
        taskId: commentTarget === 'task' ? taskId : null,
        caseId: caseId
      };

      addComment(fileAddComment);
      setPendingComment((0, _extends3.default)({}, fileAddComment, {
        actor: user
      }));
    };
  },
  onComment: function onComment(_ref4) {
    var addComment = _ref4.addComment,
        user = _ref4.user,
        caseId = _ref4.caseId,
        taskId = _ref4.taskId,
        commentTarget = _ref4.commentTarget,
        setPendingComment = _ref4.setPendingComment;
    return function (message) {
      var comment = {
        type: 'commentAdd',
        userId: user.id,
        message: message,
        caseId: caseId,
        taskId: commentTarget === 'task' ? taskId : null,
        user: user
      };

      addComment(comment);
      setPendingComment((0, _extends3.default)({}, comment, {
        actor: user
      }));
    };
  },
  onTargetChange: function onTargetChange(_ref5) {
    var setCommentTarget = _ref5.setCommentTarget;
    return function (target) {
      return setCommentTarget(target);
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        onTargetChange = _props.onTargetChange,
        commentTarget = _props.commentTarget,
        taskId = _props.taskId;


    if (!taskId && nextProps.taskId) {
      onTargetChange('task');

      return;
    }

    if (taskId && !nextProps.taskId && commentTarget === 'task') {
      onTargetChange('case');
    }
  }
}), (0, _styles.defaultStyle)(function (_ref6) {
  var padding = _ref6.padding;
  return {
    comments: {
      marginTop: padding.large
    },

    commentTarget: {
      marginTop: padding.large
    }
  };
}))(Main);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/containers/Main.js