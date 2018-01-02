'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

var _styles = require('../styles');

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MarkdownMentions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var children = props.children;


  if (!children) {
    return null;
  }

  return _react2.default.createElement(
    _Markdown2.default,
    (0, _extends3.default)({}, props.style, { unsafe: true }),
    _utils.StringUtils.parseMentions(children.toString(), (0, _extends3.default)({}, props.style('mention')))
  );
}

MarkdownMentions.propTypes = {
  children: _propTypes2.default.node
};

var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    mention: {
      backgroundColor: theme.color.primary.light
    }
  };
});

exports.default = styled(MarkdownMentions);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/MarkdownMentions.js