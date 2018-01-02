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

var _styles = require('../../styles');

var _higherOrder = require('../higher-order');

var _Markdown = require('../Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _ContextHelp = require('../ContextHelp');

var _ContextHelp2 = _interopRequireDefault(_ContextHelp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Label(props) {
  var children = props.children,
      description = props.description,
      style = props.style,
      htmlFor = props.htmlFor,
      rest = (0, _objectWithoutProperties3.default)(props, ['children', 'description', 'style', 'htmlFor']);


  return _react2.default.createElement(
    'label',
    (0, _extends3.default)({ htmlFor: htmlFor }, rest, style),
    _react2.default.createElement(
      'div',
      style('content'),
      children,
      (0, _lodash.isString)(description) ? _react2.default.createElement(
        _ContextHelp2.default,
        { style: style('description'), placement: 'top' },
        _react2.default.createElement(
          _Markdown2.default,
          null,
          description
        )
      ) : description
    )
  );
}


var styled = (0, _styles.defaultStyle)(function (_ref) {
  var color = _ref.color,
      font = _ref.font,
      padding = _ref.padding,
      lineHeight = _ref.lineHeight;

  var height = _styles.utils.calculateHeight(font.size.normal, lineHeight, padding.small);

  var verticalPadding = _styles.utils.calculateVerticalPadding(height, font.size.normal, lineHeight);

  return {
    position: 'relative',

    height: _styles.variables.lineHeight.block,

    textAlign: 'right',

    content: {
      paddingTop: verticalPadding,
      paddingBottom: verticalPadding,
      paddingLeft: padding.normal,
      paddingRight: padding.normal
    },

    '&plain': {
      content: (0, _extends3.default)({}, _styles.utils.ellipsis(), {

        /* Avoids automatic table layout
          https://stackoverflow.com/questions/37186433/white-space-nowrap-affects-width
        */
        display: 'table',
        width: '100%',
        tableLayout: 'fixed'
      })
    },

    '&focus': {
      content: {
        position: 'absolute',

        top: 0,
        left: 0,

        zIndex: 2,

        width: '100%',

        backgroundColor: color.mono.ultralight,
        color: _styles.utils.color(color.mono.ultralight)
      }
    }
  };
}, function (_ref2) {
  var focus = _ref2.focus;
  return {
    '&focus': focus,
    '&plain': !focus
  };
});

exports.default = (0, _recompose.compose)(styled, (0, _higherOrder.omitProps)(['focus']))(Label);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/Label.js