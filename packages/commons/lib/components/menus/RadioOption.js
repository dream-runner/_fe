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

var _styles = require('../../styles');

var _higherOrder = require('../higher-order');

var _tiles = require('../tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RadioOption(_ref) {
  var children = _ref.children,
      selected = _ref.selected,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'selected', 'disabled', 'onClick']);

  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({}, rest, {
      iconSet: 'fontAwesome',
      icon: selected ? 'dot-circle-o' : 'circle-o',
      onClick: function (_onClick) {
        function onClick(_x) {
          return _onClick.apply(this, arguments);
        }

        onClick.toString = function () {
          return _onClick.toString();
        };

        return onClick;
      }(function (ev) {
        if (disabled) {
          return;
        }

        if (onClick) {
          onClick(ev);
        }
      })
    }),
    children
  );
}

exports.default = (0, _recompose.compose)((0, _higherOrder.hintIfDisabled)({
  position: 'right',
  small: true
}), (0, _styles.defaultStyle)(function (theme) {
  return {
    cursor: 'pointer',

    icon: (0, _extends3.default)({
      backgroundColor: theme.color.primary.base,
      color: _styles.utils.color(theme.color.primary.base)

    }, _styles.utils.transition(['background-color', 'color']), {

      ':hover': {
        backgroundColor: _styles.utils.hover(theme.color.primary.base),
        color: _styles.utils.color(_styles.utils.hover(theme.color.primary.base))
      }
    }),

    '&disabled': {
      cursor: 'default',

      icon: {
        backgroundColor: theme.color.mono.lighter,
        color: _styles.utils.color(theme.color.mono.lighter),

        ':hover': null
      }
    }
  };
}, function (props) {
  return {
    '&disabled': props.disabled,
    '&selected': props.selected
  };
}))(RadioOption);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/menus/RadioOption.js