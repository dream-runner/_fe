'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('../components');

var _buttons = require('../components/buttons');

var _styles = require('../styles');

var _StringUtils = require('../utils/StringUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CollapsedText(_ref) {
  var _ref$length = _ref.length,
      length = _ref$length === undefined ? 100 : _ref$length,
      children = _ref.children,
      style = _ref.style,
      isExpanded = _ref.isExpanded,
      onToggle = _ref.onToggle,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['length', 'children', 'style', 'isExpanded', 'onToggle']);

  var text = children.toString();
  var alwaysExpand = text.length <= length;

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style),
    _react2.default.createElement(
      'div',
      style('message'),
      isExpanded ? text : (0, _StringUtils.preview)(text, length) + ' ...'
    ),
    !alwaysExpand && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_components.Divider, null),
      _react2.default.createElement(
        _buttons.LinkButton,
        { small: true, block: true, onClick: onToggle },
        isExpanded ? (0, _signavioI18n2.default)('Hide text') : (0, _signavioI18n2.default)('Show complete text')
      )
    )
  );
}

var calculatePadding = function calculatePadding(fontSize, baseFontSize, lineHeight) {
  return _styles.utils.calculateAbsoluteLineHeight(fontSize, lineHeight) - _styles.utils.calculateAbsoluteLineHeight(fontSize, lineHeight) / 2;
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('isExpanded', 'toggleExpanded', function (_ref2) {
  var children = _ref2.children,
      _ref2$length = _ref2.length,
      length = _ref2$length === undefined ? 100 : _ref2$length;
  return children.toString().length <= length;
}), (0, _recompose.withHandlers)({
  onToggle: function onToggle(_ref3) {
    var isExpanded = _ref3.isExpanded,
        toggleExpanded = _ref3.toggleExpanded;
    return function () {
      return toggleExpanded(!isExpanded);
    };
  }
}), (0, _styles.defaultStyle)(function (_ref4) {
  var padding = _ref4.padding,
      font = _ref4.font,
      lineHeight = _ref4.lineHeight;
  return {
    paddingLeft: padding.normal,
    paddingRight: padding.normal,
    paddingTop: calculatePadding(font.size.form, font.size.normal, lineHeight),
    paddingBottom: calculatePadding(font.size.form, font.size.normal, lineHeight),

    message: {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word'
    }
  };
}), (0, _components.omitProps)(['toggleExpanded']))(CollapsedText);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/CollapsedText.js