'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _utils = require('../utils');

var _styles = require('../styles');

var _MarkdownInput = require('./MarkdownInput');

var _MarkdownInput2 = _interopRequireDefault(_MarkdownInput);

var _MentionsInput = require('./MentionsInput');

var _MentionsInput2 = _interopRequireDefault(_MentionsInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MarkdownMentionsInput(props) {
  var children = props.children,
      description = props.description,
      value = props.value,
      onRenderPreview = props.onRenderPreview,
      rest = (0, _objectWithoutProperties3.default)(props, ['children', 'description', 'value', 'onRenderPreview']);


  return _react2.default.createElement(
    _MarkdownInput2.default,
    {
      style: props.style,
      value: value,
      description: description,
      renderPreview: onRenderPreview
    },
    _react2.default.createElement(
      _MentionsInput2.default,
      (0, _extends3.default)({}, rest, { style: props.style('mentions'), value: value }),
      children
    )
  );
}

MarkdownMentionsInput.propTypes = {
  renderPreview: _propTypes2.default.func,
  description: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),

  children: _propTypes2.default.node
};

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (theme) {
  return {
    textAlign: 'left',

    preview: {
      mention: {
        backgroundColor: theme.color.primary.light,

        paddingLeft: _styles.padding.small,
        paddingRight: _styles.padding.small
      }
    }
  };
}), (0, _recompose.withHandlers)({
  onRenderPreview: function onRenderPreview(_ref) {
    var style = _ref.style,
        _ref$renderPreview = _ref.renderPreview,
        renderPreview = _ref$renderPreview === undefined ? _utils.StringUtils.parseMentions : _ref$renderPreview;
    return function (value) {
      return renderPreview(value, (0, _extends3.default)({}, style('preview')('mention')));
    };
  }
}))(MarkdownMentionsInput);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/MarkdownMentionsInput.js