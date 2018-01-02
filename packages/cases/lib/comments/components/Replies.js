'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _Conversation = require('./Conversation');

var _Conversation2 = _interopRequireDefault(_Conversation);

var _Toggle = require('./Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Replies(_ref) {
  var comment = _ref.comment,
      isLoaded = _ref.isLoaded,
      isLoading = _ref.isLoading,
      replies = _ref.replies,
      addReply = _ref.addReply,
      style = _ref.style,
      onToggle = _ref.onToggle,
      onReply = _ref.onReply;
  var childrenIds = comment.childrenIds;


  return _react2.default.createElement(
    'div',
    null,
    isLoading && _react2.default.createElement(
      _hints.Hint,
      { loading: true, small: true },
      (0, _signavioI18n2.default)('Loading replies...')
    ),
    !isLoading && !isLoaded ? _react2.default.createElement(_Toggle2.default, { replies: (childrenIds || []).length, onClick: onToggle }) : _react2.default.createElement(
      'div',
      style('conversation'),
      _react2.default.createElement(_Conversation2.default, {
        isBusy: addReply.pending,
        replies: replies,
        onReply: onReply
      })
    )
  );
}
exports.default = (0, _recompose.compose)(_effektifApi.withUser, (0, _effektifApi.connect)(function (_ref2) {
  var caseId = _ref2.caseId,
      comment = _ref2.comment;
  return {
    fetchReplies: {
      type: _effektifApi.types.COMMENT,
      lazy: true,
      query: {
        caseId: caseId,
        id: comment.id
      }
    },
    addReply: {
      type: _effektifApi.types.COMMENT,
      method: 'create'
    }
  };
}), (0, _recompose.withHandlers)({
  onToggle: function onToggle(_ref3) {
    var fetchReplies = _ref3.fetchReplies;
    return function (event) {
      event.preventDefault();
      event.stopPropagation();

      fetchReplies();
    };
  },
  onReply: function onReply(_ref4) {
    var addReply = _ref4.addReply,
        caseId = _ref4.caseId,
        comment = _ref4.comment,
        user = _ref4.user;
    return function (reply) {
      return addReply({
        type: 'commentAdd',
        userId: user.id,
        message: reply,
        caseId: caseId,
        parentId: comment.id,
        user: user
      });
    };
  }
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref5) {
    var addReply = _ref5.addReply,
        fetchReplies = _ref5.fetchReplies;

    if (!addReply.pending && this.props.addReply.pending) {
      fetchReplies();
    }
  }
}), (0, _recompose.withProps)(function (_ref6) {
  var fetchReplies = _ref6.fetchReplies;
  return {
    replies: fetchReplies.fulfilled && fetchReplies.value.children || [],
    isLoading: fetchReplies.pending,
    isLoaded: fetchReplies.fulfilled && fetchReplies.value.children
  };
}), (0, _components.omitProps)(['user', 'fetchReplies']), (0, _styles.defaultStyle)({
  conversation: {
    marginTop: 1
  }
}))(Replies);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/Replies.js