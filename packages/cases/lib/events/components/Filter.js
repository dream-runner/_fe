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

var _styles = require('@signavio/effektif-commons/lib/styles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _components = require('@signavio/effektif-commons/lib/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Filter(_ref) {
  var children = _ref.children,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children']);

  return _react2.default.createElement(
    _buttons.LinkButton,
    rest,
    children
  );
}
exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      font = _ref2.font,
      padding = _ref2.padding,
      lineHeight = _ref2.lineHeight;

  var height = _styles.utils.calculateHeight(font.size.small, lineHeight, padding.xsmall);

  return {
    paddingLeft: padding.small,
    paddingRight: padding.small,

    height: height,
    lineHeight: height + 'px',

    '&active': (0, _extends3.default)({}, _styles.utils.borderBottom('1px', 'solid', color.primary.base))
  };
}, function (_ref3) {
  var active = _ref3.active;
  return {
    '&active': active
  };
}), (0, _recompose.withHandlers)({
  onClick: function (_onClick) {
    function onClick(_x) {
      return _onClick.apply(this, arguments);
    }

    onClick.toString = function () {
      return _onClick.toString();
    };

    return onClick;
  }(function (_ref4) {
    var data = _ref4.data,
        onClick = _ref4.onClick;
    return function () {
      return onClick(data);
    };
  })
}), (0, _components.omitProps)(['active', 'data']))(Filter);


// WEBPACK FOOTER //
// ./packages/cases/lib/events/components/Filter.js