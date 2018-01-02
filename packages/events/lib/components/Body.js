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

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Body(_ref) {
  var children = _ref.children,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'style']);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style),
    _react2.default.createElement('div', style(['arrow', 'back'])),
    _react2.default.createElement('div', style(['arrow', 'front'])),
    children
  );
}

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      padding = _ref2.padding,
      font = _ref2.font;

  var arrowSize = padding.normal - padding.small;
  var outerArrowSize = arrowSize + 1;

  return (0, _extends3.default)({
    position: 'relative',

    marginTop: padding.normal,
    marginBottom: padding.normal,

    padding: padding.small,

    fontSize: font.size.form

  }, _styles.utils.border(1, 'solid', color.mono.light), {

    arrow: {
      position: 'absolute',

      borderStyle: 'solid',
      borderColor: 'transparent'
    },

    back: {
      top: -(2 * outerArrowSize + 1),
      left: '50%',

      transform: 'translate(-50%)',

      width: outerArrowSize,
      height: outerArrowSize,

      borderWidth: outerArrowSize,
      borderBottomColor: color.mono.light
    },

    front: {
      top: -2 * arrowSize,
      left: '50%',

      transform: 'translate(-50%)',

      width: arrowSize,
      height: arrowSize,

      borderWidth: arrowSize,
      borderBottomColor: 'white'
    }
  });
});

exports.default = styled(Body);


// WEBPACK FOOTER //
// ./packages/events/lib/components/Body.js