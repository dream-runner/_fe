'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelPure = exports.BORDER_WIDTH = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BORDER_WIDTH = exports.BORDER_WIDTH = 1;
var LabelPure = function LabelPure(_ref) {
  var name = _ref.name,
      onRemove = _ref.onRemove,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['name', 'onRemove', 'style']);
  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style),
    _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, style('labelName'), { title: name }),
      name
    ),
    onRemove && _react2.default.createElement(_components.Icon, {
      onClick: function onClick(ev) {
        onRemove();
        ev.stopPropagation();
      },
      icon: 'times',
      style: style('icon')
    }),
    _react2.default.createElement(_components.Clearfix, null)
  );
};

exports.LabelPure = LabelPure;
var getModifiers = function getModifiers(props) {
  return {
    '&small': props.small,
    '&xsmall': props.xsmall
  };
};

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (theme, _ref2) {
  var color = _ref2.color;

  var xsmallHeight = _styles.utils.calculateHeight(theme.font.size.xsmall, theme.lineHeight, 0);

  return (0, _extends3.default)({
    backgroundColor: color,
    borderRadius: 3,
    color: _styles.utils.color(color),
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: theme.font.size.form,
    lineHeight: theme.lineHeight,
    maxWidth: '100%',
    paddingTop: theme.padding.xsmall,
    paddingBottom: theme.padding.xsmall,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  }, _styles.utils.boxShadow(), _styles.utils.border(BORDER_WIDTH, 'solid', (0, _color2.default)(color).darken(0.2).string()), {

    labelName: (0, _extends3.default)({
      float: 'left',
      marginLeft: theme.padding.small,
      marginRight: theme.padding.small
    }, _styles.utils.ellipsis()),

    icon: (0, _extends3.default)({
      float: 'left',
      fontSize: theme.font.size.form,
      paddingTop: 0,
      paddingBottom: 0
    }, _styles.utils.borderLeft(BORDER_WIDTH, 'solid', (0, _color2.default)(color).darken(0.2).string())),

    '&small': {
      fontSize: theme.font.size.small,

      icon: {
        fontSize: theme.font.size.small,
        width: 21
      }
    },

    '&xsmall': {
      fontSize: parseInt(theme.font.size.xsmall, 10) - 1 + 'pt',
      paddingTop: 0,
      paddingBottom: 0,
      boxShadow: 'none',
      height: xsmallHeight,
      lineHeight: xsmallHeight + 'px',

      labelName: {
        marginLeft: theme.padding.xsmall,
        marginRight: theme.padding.xsmall
      },

      icon: {
        fontSize: parseInt(theme.font.size.xsmall, 10) - 1 + 'pt',
        width: 16
      }
    }
  });
}, getModifiers), (0, _components.omitProps)(['organizationId', 'small', 'xsmall']))(LabelPure);


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/components/LabelTile.js