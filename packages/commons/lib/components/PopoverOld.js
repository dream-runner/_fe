'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('../utils');

var _propTypes3 = require('../propTypes');

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Popover = function (_Component) {
  (0, _inherits3.default)(Popover, _Component);

  function Popover() {
    (0, _classCallCheck3.default)(this, Popover);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));

    _this.state = {
      visible: false,
      active: false,
      position: { left: 0 }
    };
    return _this;
  }

  Popover.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.disabled) {
      this.setState({
        visible: false,
        active: false
      });
    }
  };

  Popover.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (this.state.active && !prevState.active) {
      this.scheduleVisibilityChange(true, this.props.showDelay);

      this.setState({
        position: this.updatePosition()
      });
    }

    if (!this.state.active && prevState.active) {
      this.scheduleVisibilityChange(false, this.props.hideDelay);
    }
  };

  Popover.prototype.scheduleVisibilityChange = function scheduleVisibilityChange(visible, delay) {
    var _this2 = this;

    if (delay === 0 || this.props.trigger === 'click') {
      this.setState({
        visible: visible
      });

      return;
    }

    if (this.__timer) {
      window.clearTimeout(this.__timer);
    }

    this.__timer = window.setTimeout(function () {
      _this2.setState({
        visible: visible
      });
    }, delay);
  };

  Popover.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.__timer) {
      window.clearTimeout(this.__timer);
    }
  };

  Popover.prototype.updatePosition = function updatePosition() {
    var placement = this.props.placement;

    var popover = _reactDom2.default.findDOMNode(this.refs.popover);
    var trigger = _reactDom2.default.findDOMNode(this);

    switch (placement) {
      case 'top':
      case 'bottom':
        return {
          left: ((0, _jquery2.default)(trigger).outerWidth() - (0, _jquery2.default)(popover).outerWidth()) / 2
        };
      case 'left':
      case 'right':
        return {
          left: 0
        };
    }
  };

  Popover.prototype.render = function render() {
    var _props = this.props,
        placement = _props.placement,
        dx = _props.dx,
        dy = _props.dy,
        trigger = _props.trigger,
        visible = _props.visible;


    return _react2.default.createElement(
      _Overlay2.default,
      {
        visible: trigger === 'managed' ? visible : this.state.active,
        dx: this.getHorizontalOffset() + (dx || 0),
        dy: this.getVerticalOffset() + (dy || 0),
        overlay: this.renderPopover(),
        placement: placement
      },
      _react2.default.cloneElement(_react.Children.only(this.props.children), this.getTriggerProps())
    );
  };

  Popover.prototype.getHorizontalOffset = function getHorizontalOffset() {
    var placement = this.props.placement;


    switch (placement) {
      case 'left':
        return -1 * this.getPadding();
      case 'right':
        return this.getPadding();
      case 'top':
      case 'bottom':
        return this.state.position.left;
    }
  };

  Popover.prototype.getVerticalOffset = function getVerticalOffset() {
    var placement = this.props.placement;


    switch (placement) {
      case 'top':
        return -1 * this.getPadding();
      case 'bottom':
        return this.getPadding();
      case 'left':
      case 'right':
        return 0;
    }
  };

  Popover.prototype.getTriggerProps = function getTriggerProps() {
    switch (this.props.trigger) {
      case 'hover':
        return {
          onMouseOver: this.handleMouseOver.bind(this),
          onMouseOut: this.handleMouseOut.bind(this)
        };
      case 'click':
        return {
          onClick: this.toggleVisibility.bind(this)
        };
      case 'managed':
        return {};
    }
  };

  Popover.prototype.toggleVisibility = function toggleVisibility() {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      active: !this.state.active
    });
  };

  Popover.prototype.handleMouseOver = function handleMouseOver() {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      active: true
    });
  };

  Popover.prototype.handleMouseOut = function handleMouseOut() {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      active: false
    });
  };

  Popover.prototype.getPadding = function getPadding() {
    if (this.props.small) {
      return this.props.padding / 2;
    }

    return this.props.padding;
  };

  Popover.prototype.renderPopover = function renderPopover() {
    var cls = _utils.CSSUtils.cls({
      popover: true,
      'popover-visible': this.props.trigger === 'managed' ? this.props.visible : this.state.visible,
      'popover-titled': !!this.props.title,
      'popover-small': this.props.small
    }, 'popover-' + this.props.placement, this.props.className);

    return _react2.default.createElement(
      'div',
      { className: cls, ref: 'popover', style: this.props.style },
      _react2.default.createElement('div', { className: 'popover-arrow' }),
      this.renderTitle(),
      _react2.default.createElement(
        'div',
        { className: 'popover-content' },
        this.props.popover
      )
    );
  };

  Popover.prototype.renderTitle = function renderTitle() {
    if (!this.props.title) {
      return;
    }

    if (this.props.small) {
      return _react2.default.createElement(
        'div',
        { className: 'popover-title' },
        _react2.default.createElement(
          'h6',
          null,
          this.props.title
        )
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'popover-title' },
      _react2.default.createElement(
        'h5',
        null,
        this.props.title
      )
    );
  };

  return Popover;
}(_react.Component);

Popover.propTypes = {
  popover: _propTypes2.default.node,
  children: _propTypes2.default.node,
  showDelay: _propTypes2.default.number,
  hideDelay: _propTypes2.default.number,
  dx: _propTypes2.default.number,
  dy: _propTypes2.default.number,
  padding: _propTypes2.default.number,
  className: _propTypes2.default.string,
  trigger: _propTypes2.default.string,
  placement: _propTypes2.default.string,
  title: _propTypes2.default.string,
  visible: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  small: _propTypes2.default.bool,
  style: _propTypes2.default.object
};
Popover.contextTypes = {
  user: _propTypes3.User,
  organization: _propTypes3.Organization,
  token: _propTypes2.default.string
};
Popover.defaultProps = {
  placement: 'top',
  trigger: 'hover',
  padding: 15,
  style: {},
  showDelay: 500,
  hideDelay: 50,

  forceRight: false,
  forceLeft: false,
  forceTop: false,
  forceBottom: false
};
exports.default = Popover;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/PopoverOld.js