'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = createRemovable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fp = require('lodash/fp');

var _recompose = require('recompose');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRemovable(WrappedComponent) {
  return function Removable(props) {
    var onRemove = props.onRemove,
        rest = (0, _objectWithoutProperties3.default)(props, ['onRemove']);

    var isValidCondition = (0, _utils.isValid)(rest);

    return _react2.default.createElement(
      _tiles.Tile,
      {
        transparent: true,
        toolbar: _react2.default.createElement(
          'div',
          { style: { marginLeft: 1 } },
          _react2.default.createElement(RemoveButton, {
            icon: isValidCondition ? null : 'warning',
            danger: !isValidCondition,
            disabled: props.readOnly,
            onClick: onRemove
          })
        )
      },
      _react2.default.createElement(WrappedComponent, rest)
    );
  };
}

var omitProps = (0, _recompose.compose)(_recompose.mapProps, _fp.omit);

var enhance = (0, _recompose.compose)((0, _recompose.withState)('hover', 'toggleHover', false), (0, _recompose.withHandlers)({
  onMouseEnter: function onMouseEnter(_ref) {
    var toggleHover = _ref.toggleHover,
        disabled = _ref.disabled;
    return function () {
      return !disabled && toggleHover(true);
    };
  },
  onMouseLeave: function onMouseLeave(_ref2) {
    var toggleHover = _ref2.toggleHover,
        disabled = _ref2.disabled;
    return function () {
      return !disabled && toggleHover(false);
    };
  }
}), omitProps(['toggleHover']));

var getIcon = function getIcon(icon, hover) {
  if (hover) {
    return 'trash';
  }

  return icon || 'trash';
};

var RemoveButton = enhance(function (_ref3) {
  var hover = _ref3.hover,
      icon = _ref3.icon,
      rest = (0, _objectWithoutProperties3.default)(_ref3, ['hover', 'icon']);
  return _react2.default.createElement(_buttons.IconButton, (0, _extends3.default)({}, rest, { icon: getIcon(icon, hover) }));
});


// WEBPACK FOOTER //
// ./packages/conditions/lib/higher-order/createRemovable.js