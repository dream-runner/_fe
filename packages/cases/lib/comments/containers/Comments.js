'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components2 = require('../../components');

var _Comment = require('./Comment');

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Comments(_ref) {
  var fetchComments = _ref.fetchComments,
      caseId = _ref.caseId,
      taskId = _ref.taskId,
      style = _ref.style;

  if (fetchComments.pending && !fetchComments.value) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading comments...')
    );
  }

  if (fetchComments.rejected) {
    return _react2.default.createElement(
      _hints.Hint,
      { danger: true },
      (0, _signavioI18n2.default)('Could not load comments for the following reason: __reason__', {
        reason: fetchComments.reason
      })
    );
  }

  var comments = (0, _lodash.filter)(fetchComments.value, function (comment) {
    if (comment.parentId) {
      return false;
    }

    if (taskId) {
      return taskId === comment.taskId;
    }

    return true;
  });

  if (comments.length === 0) {
    return _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)('So far no comments have been made.')
    );
  }

  return _react2.default.createElement(
    _components.List,
    { style: style('comments') },
    (0, _lodash.map)((0, _lodash.sortBy)(comments, (comments, function (_ref2) {
      var time = _ref2.time;
      return -1 * new Date(time).getTime();
    })), function (comment) {
      return _react2.default.createElement(_Comment2.default, { key: comment.id, caseId: caseId, comment: comment });
    })
  );
}

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref3) {
  var caseId = _ref3.caseId,
      taskId = _ref3.taskId;
  return {
    fetchComments: {
      type: _effektifApi.types.COMMENTS,
      query: {
        caseId: caseId,
        taskId: taskId
      }
    }
  };
}), (0, _components2.withPeriodicAction)(function (_ref4) {
  var fetchComments = _ref4.fetchComments;
  return fetchComments();
}), (0, _styles.defaultStyle)(function (_ref5) {
  var padding = _ref5.padding;
  return {
    comments: {
      entry: {
        marginTop: padding.large
      }
    }
  };
}))(Comments);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/containers/Comments.js