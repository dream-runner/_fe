'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _Reply = require('./Reply');

var _Reply2 = _interopRequireDefault(_Reply);

var _AddReply = require('./AddReply');

var _AddReply2 = _interopRequireDefault(_AddReply);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Conversation(_ref) {
  var isBusy = _ref.isBusy,
      _ref$replies = _ref.replies,
      replies = _ref$replies === undefined ? [] : _ref$replies,
      style = _ref.style,
      onReply = _ref.onReply;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      style('replies'),
      _react2.default.createElement(
        _components.List,
        null,
        replies.map(function (reply, index) {
          return _react2.default.createElement(
            'div',
            { key: reply.id },
            index > 0 && _react2.default.createElement(_components.Divider, null),
            _react2.default.createElement(_Reply2.default, { reply: reply })
          );
        })
      )
    ),
    replies.length > 0 && _react2.default.createElement(_components.Divider, null),
    _react2.default.createElement(_AddReply2.default, { onReply: onReply, isBusy: isBusy })
  );
}


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var padding = _ref2.padding;
  return {
    replies: {
      paddingLeft: padding.normal
    }
  };
});

exports.default = styled(Conversation);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/Conversation.js