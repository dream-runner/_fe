'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _propTypes3 = require('../propTypes');

var _utils = require('../utils');

var _styles = require('../styles');

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _buttons = require('./buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropDown = function (_Component) {
  (0, _inherits3.default)(DropDown, _Component);

  function DropDown() {
    (0, _classCallCheck3.default)(this, DropDown);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));

    var open = _this.props.open;


    _this.state = {
      open: open
    };
    return _this;
  }

  DropDown.prototype.componentDidMount = function componentDidMount() {
    this.updateMenuWidth();
  };

  DropDown.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (!nextState.open || nextState.open === this.state.open) {
      return;
    }

    this.updateMenuWidth();
  };

  DropDown.prototype.updateMenuWidth = function updateMenuWidth() {
    this.setState({
      menuStyle: {
        minWidth: (0, _jquery2.default)(this.refs.toggle).outerWidth()
      }
    });
  };

  DropDown.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.open === false || nextProps.open === true) {
      this.setState({
        open: nextProps.open
      });
    }
  };

  DropDown.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        style = _props.style,
        pushRight = _props.pushRight,
        rest = (0, _objectWithoutProperties3.default)(_props, ['style', 'pushRight']);


    return _react2.default.createElement(
      _Overlay2.default,
      {
        visible: this.state.open,
        overlay: this.renderMenu(),
        pushRight: pushRight,
        onOutsideClick: function onOutsideClick() {
          return _this2.close();
        }
      },
      _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, (0, _lodash.omit)(rest, ['closeOnClick', 'iconSet', 'onToggle', 'toggle', 'toggleIcon', 'hideToggleButton']), {
          ref: 'toggle'
        }, style, {
          onClick: function onClick(ev) {
            return _this2.handleToggle(ev);
          }
        }),
        this.renderToggle()
      )
    );
  };

  DropDown.prototype.renderToggle = function renderToggle() {
    if ((0, _lodash.isNull)(this.props.toggleIcon) || this.props.hideToggleButton) {
      return this.renderToggleContent();
    }

    if (!this.props.toggle) {
      return this.renderToggleButton();
    }

    var style = this.props.style;


    return _react2.default.createElement(
      'div',
      style('content'),
      this.renderToggleContent(),
      this.renderToggleButton()
    );
  };

  DropDown.prototype.renderToggleContent = function renderToggleContent() {
    if ((0, _lodash.isFunction)(this.props.toggle)) {
      return this.props.toggle(this.state.open);
    }

    return this.props.toggle;
  };

  DropDown.prototype.renderToggleButton = function renderToggleButton() {
    var open = this.state.open;
    var _props2 = this.props,
        toggleIcon = _props2.toggleIcon,
        disabled = _props2.disabled,
        style = _props2.style,
        iconSet = _props2.iconSet;


    return _react2.default.createElement(_buttons.IconButton, {
      iconSet: !toggleIcon ? 'fontAwesome' : iconSet,
      disabled: disabled,
      icon: toggleIcon || (open ? 'angle-up' : 'angle-down'),
      style: style('toggle')
    });
  };

  DropDown.prototype.handleToggle = function handleToggle(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    if (this.props.disabled) {
      return;
    }

    if (this.props.onToggle) {
      this.props.onToggle(!this.state.open);
    }

    this.setState({
      open: !this.state.open
    });
  };

  DropDown.prototype.renderMenu = function renderMenu() {
    var _this3 = this;

    if (!this.state.open) {
      return;
    }

    if (!this.props.children) {
      return;
    }

    var style = this.props.style;


    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, style('menu'), {
        style: (0, _extends3.default)({}, style('menu').style, this.state.menuStyle),
        onClick: function onClick() {
          return _this3.props.closeOnClick && _this3.close();
        }
      }),
      this.props.children
    );
  };

  DropDown.prototype.close = function close() {
    if (!this.props.disabled && this.state.open && this.props.onToggle) {
      this.props.onToggle(false);
    }

    this.setState({
      open: false
    });
  };

  return DropDown;
}(_react.Component);

DropDown.propTypes = {
  open: _propTypes2.default.bool,
  toggle: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  toggleIcon: _propTypes2.default.string,
  className: _propTypes2.default.string,
  onToggle: _propTypes2.default.func,
  closeOnClick: _propTypes2.default.bool,
  iconSet: _propTypes2.default.string,
  pushRight: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  hideToggleButton: _propTypes2.default.bool,
  children: _propTypes2.default.node
};
DropDown.contextTypes = {
  theme: _propTypes3.Theme
};
DropDown.defaultProps = {
  open: false,
  closeOnClick: false
};
exports.default = (0, _styles.defaultStyle)(function (theme) {
  return {
    position: 'relative',

    menu: (0, _extends3.default)({
      backgroundColor: 'white',

      padding: theme.padding.xsmall

    }, _styles.utils.border('1px', 'solid', theme.color.mono.lighter), _styles.utils.boxShadow()),

    '&customToggle': {
      content: {
        marginRight: _styles.variables.lineHeight.block
      },

      toggle: {
        position: 'absolute',
        top: 0,
        right: 0
      }
    }
  };
}, function (_ref) {
  var toggle = _ref.toggle;
  return {
    '&customToggle': !!toggle
  };
})(DropDown);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/DropDown.js