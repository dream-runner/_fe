'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _views = require('@signavio/effektif-commons/lib/views');

var _Replies = require('./Replies');

var _Replies2 = _interopRequireDefault(_Replies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CommentContent(_ref) {
  var style = _ref.style,
      caseId = _ref.caseId,
      comment = _ref.comment;
  var message = comment.message,
      type = comment.type,
      file = comment.file;


  if (type === 'fileAdd') {
    return _react2.default.createElement(
      'div',
      style,
      _react2.default.createElement(_views.File, {
        showImage: true,
        file: {
          src: (0, _effektifApi.getBaseUrl)() + 'files/' + file.id,
          size: file.sizeInBytes,
          name: file.name,
          contentType: file.contentType
        }
      }),
      _react2.default.createElement(_components.Divider, null),
      _react2.default.createElement(_Replies2.default, { caseId: caseId, comment: comment })
    );
  }

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      _components.MarkdownMentions,
      { style: style('message') },
      message
    ),
    _react2.default.createElement(_components.Divider, null),
    _react2.default.createElement(_Replies2.default, { caseId: caseId, comment: comment })
  );
}


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      padding = _ref2.padding;
  return {
    message: {
      padding: padding.normal,
      backgroundColor: color.mono.ultralight
    }
  };
});

exports.default = styled(CommentContent);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/CommentContent.js