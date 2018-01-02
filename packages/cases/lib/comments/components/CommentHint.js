'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentHint = function CommentHint(_ref) {
  var commentOnTask = _ref.commentOnTask,
      style = _ref.style;

  if (commentOnTask) {
    return _react2.default.createElement(
      'div',
      style,
      _react2.default.createElement(
        _hints.Hint,
        { inline: true, small: true },
        (0, _signavioI18n2.default)('This comment will be associated with the **task** you **currently** see. Only users who have access to this task will be able to see this comment.', { markdown: true })
      )
    );
  }

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      _hints.Hint,
      { inline: true, small: true },
      (0, _signavioI18n2.default)('This comment will be associated with the whole **case**. Everyone who has access to this case will be able to see this comment.', { markdown: true })
    )
  );
};

var styled = (0, _styles.defaultStyle)(function () {
  return {
    paddingTop: 10
  };
});

exports.default = styled(CommentHint);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/CommentHint.js