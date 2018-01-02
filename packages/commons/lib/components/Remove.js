'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultStyle = exports.getModifiers = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.AsConfirm = AsConfirm;
exports.Trash = Trash;
exports.Confirm = Confirm;
exports.Cancel = Cancel;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _lodash = require('lodash');

var _styles = require('../styles');

var _buttons = require('./buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Remove(props) {
  var icon = props.icon,
      light = props.light,
      confirm = props.confirm,
      disabled = props.disabled,
      onRequestConfirm = props.onRequestConfirm,
      onCancel = props.onCancel,
      children = props.children,
      style = props.style,
      onRemove = props.onRemove,
      rest = (0, _objectWithoutProperties3.default)(props, ['icon', 'light', 'confirm', 'disabled', 'onRequestConfirm', 'onCancel', 'children', 'style', 'onRemove']);


  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style, {
      onMouseMove: function onMouseMove(ev) {
        return confirm && onRequestConfirm(ev);
      }
    }),
    _react2.default.createElement(
      Trash,
      {
        style: style('trash'),
        disabled: disabled || confirm,
        light: light,
        icon: icon,
        onClick: onRequestConfirm
      },
      children
    ),
    _react2.default.createElement(Confirm, {
      style: style('confirm'),
      onClick: function onClick(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        if (onRemove) {
          onRemove();
        }
      }
    }),
    _react2.default.createElement(Cancel, { style: style('cancel'), light: light, onClick: onCancel })
  );
}

Remove.propTypes = {
  onRequestConfirm: _propTypes2.default.func.isRequired,
  onCancel: _propTypes2.default.func.isRequired,

  onRemove: _propTypes2.default.func,

  icon: _propTypes2.default.string,

  light: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  confirm: _propTypes2.default.bool
};

var getModifiers = exports.getModifiers = function getModifiers(props) {
  return {
    '&expanded': props.confirm
  };
};

var defaultStyle = exports.defaultStyle = function defaultStyle(theme) {
  var size = _styles.utils.calculateHeight(theme.font.size.normal, theme.lineHeight, theme.padding.small);

  return (0, _extends3.default)({
    height: size,
    width: size

  }, _styles.utils.ellipsis(), _styles.utils.transition(['width']), {

    '&expanded': {
      width: 3 * size,

      trash: {
        cursor: 'default'
      }
    },

    confirm: (0, _extends3.default)({
      color: _styles.utils.color(theme.color.status.danger),

      backgroundColor: theme.color.status.danger

    }, _styles.utils.boxShadowInset('2px', '0px', '0px'), {

      ':hover': {
        backgroundColor: (0, _color2.default)(theme.color.status.danger).darken(0.1).rgb().string()
      }
    }),

    cancel: {}
  });
};

var styled = (0, _styles.defaultStyle)(defaultStyle, getModifiers);

exports.default = AsConfirm(styled(Remove));
function AsConfirm(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    (0, _inherits3.default)(WithConfirmation, _Component);

    function WithConfirmation(props) {
      (0, _classCallCheck3.default)(this, WithConfirmation);

      var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

      _this.state = {
        confirm: false
      };
      return _this;
    }

    WithConfirmation.prototype.render = function render() {
      var _this2 = this;

      var confirm = this.state.confirm;


      return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, (0, _lodash.omit)(this.props, 'closeDelay'), {
        confirm: confirm,
        onRequestConfirm: function onRequestConfirm(ev) {
          return _this2.requestConfirmation(ev);
        },
        onCancel: function onCancel(ev) {
          return _this2.cancel(ev);
        }
      }));
    };

    WithConfirmation.prototype.requestConfirmation = function requestConfirmation(ev) {
      ev.stopPropagation();

      this.setState({
        confirm: true
      });

      this.setTimer();
    };

    WithConfirmation.prototype.setTimer = function setTimer() {
      var _this3 = this;

      var closeDelay = this.props.closeDelay;


      if (this.__timer) {
        window.clearTimeout(this.__timer);
      }

      this.__timer = window.setTimeout(function () {
        return _this3.reset();
      }, closeDelay);
    };

    WithConfirmation.prototype.reset = function reset() {
      this.setState({
        confirm: false
      });
    };

    WithConfirmation.prototype.cancel = function cancel(ev) {
      ev.stopPropagation();

      this.setState({
        confirm: false
      });
    };

    return WithConfirmation;
  }(_react.Component), _class.propTypes = {
    closeDelay: _propTypes2.default.number
  }, _class.defaultProps = {
    closeDelay: 2000
  }, _temp;
}

function Trash(_ref) {
  var icon = _ref.icon,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['icon']);

  return _react2.default.createElement(_buttons.IconButton, (0, _extends3.default)({}, rest, { icon: icon || 'trash' }));
}

Trash.propTypes = {
  icon: _propTypes2.default.string
};

function Confirm(props) {
  return _react2.default.createElement(_buttons.IconButton, (0, _extends3.default)({}, props, { icon: 'check' }));
}

function Cancel(props) {
  return _react2.default.createElement(_buttons.IconButton, (0, _extends3.default)({}, props, { icon: 'times' }));
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Remove.js