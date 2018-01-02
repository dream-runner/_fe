'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _grid = require('@signavio/effektif-commons/lib/components/grid');

var _higherOrder = require('./higher-order');

var _CommentInput = require('./CommentInput');

var _CommentInput2 = _interopRequireDefault(_CommentInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubmittableCommentInput = (0, _recompose.compose)(_higherOrder.triggerOnCompleteOnShiftEnter, (0, _components.omitProps)(['onComplete']))(_CommentInput2.default);


function CommentAdd(props) {
  var fileUploadConnection = props.fileUploadConnection,
      value = props.value,
      style = props.style,
      onChange = props.onChange,
      onFileAdd = props.onFileAdd,
      onSubmit = props.onSubmit,
      participants = props.participants;


  return _react2.default.createElement(
    _components.FileUploadDropZone,
    { fileUploadConnection: fileUploadConnection },
    _react2.default.createElement(
      'div',
      style,
      _react2.default.createElement(SubmittableCommentInput, {
        value: value,
        onChange: onChange,
        onComplete: onSubmit,
        description: (0, _signavioI18n2.default)('Type __atSign__ to mention people in your comment', {
          atSign: _react2.default.createElement(
            'kbd',
            null,
            '@'
          )
        }),
        placeholder: (0, _signavioI18n2.default)('Type a comment, involve people, or drop a file'),
        participants: participants
      }),
      _react2.default.createElement(
        'div',
        style('controls'),
        _react2.default.createElement(
          _grid.Row,
          null,
          _react2.default.createElement(
            _grid.Col,
            { xs: 5 },
            _react2.default.createElement(_components.FileUpload, {
              inline: true,
              title: (0, _signavioI18n2.default)('Upload a document'),
              onUploaded: onFileAdd,
              dropZoneConnection: fileUploadConnection
            })
          ),
          _react2.default.createElement(
            _grid.Col,
            { xs: 7 },
            _react2.default.createElement(
              'div',
              style('submit'),
              _react2.default.createElement(
                _buttons.TextButton,
                {
                  small: true,
                  primary: true,
                  onClick: onSubmit,
                  title: (0, _signavioI18n2.default)('shift+enter'),
                  disabled: !value
                },
                (0, _signavioI18n2.default)('Submit comment')
              )
            )
          )
        )
      )
    )
  );
}

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (_ref) {
  var font = _ref.font,
      padding = _ref.padding;
  return {
    controls: {
      marginTop: padding.small,
      fontSize: font.size.small
    },

    submit: {
      textAlign: 'right'
    }
  };
}), (0, _recompose.withState)('fileUploadConnection', 'setConnection', function () {
  return new _components.FileUploadDropZoneConnection();
}), (0, _recompose.withState)('value', 'setComment', ''), (0, _recompose.withHandlers)({
  onChange: function onChange(_ref2) {
    var setComment = _ref2.setComment;
    return function (ev, value) {
      return setComment(value);
    };
  },
  onSubmit: function onSubmit(_ref3) {
    var value = _ref3.value,
        setComment = _ref3.setComment,
        onComment = _ref3.onComment;
    return function () {
      onComment(value);

      setComment('');
    };
  }
}), (0, _components.omitProps)(['setConnection', 'setComment']))(CommentAdd);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/CommentAdd.js