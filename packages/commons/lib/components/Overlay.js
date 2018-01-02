'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _lodash = require('lodash');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Overlay = function (_Component) {
  (0, _inherits3.default)(Overlay, _Component);

  function Overlay() {
    (0, _classCallCheck3.default)(this, Overlay);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));

    _this.boundHandleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.boundHandleWindowResize = _this.handleWindowResize.bind(_this);

    _this.state = {
      position: null
    };
    return _this;
  }

  Overlay.prototype.componentWillMount = function componentWillMount() {
    (0, _jquery2.default)(document).on('click', this.boundHandleDocumentClick);
    (0, _jquery2.default)(window).on('resize', this.boundHandleWindowResize);

    if (!this.props.visible) {
      return;
    }

    this.mountOrUpdate(this.props, this.state);
  };

  Overlay.prototype.componentDidMount = function componentDidMount() {
    this.updatePosition();
  };

  Overlay.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (!nextProps.visible) {
      this.unmountIfNecessary();

      return;
    }

    this.mountOrUpdate(nextProps, nextState);
    this.updatePosition();
  };

  Overlay.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.props.visible) {
      this.updatePosition();
    }
  };

  Overlay.prototype.componentWillUnmount = function componentWillUnmount() {
    (0, _jquery2.default)(document).off('click', this.boundHandleDocumentClick);
    (0, _jquery2.default)(window).off('resize', this.boundHandleWindowResize);

    this.unmountIfNecessary();
  };

  Overlay.prototype.needsPositionUpdate = function needsPositionUpdate(prevProps, prevState) {
    if (prevProps.placement !== this.props.placement) {
      return true;
    }

    if (prevProps.dx !== this.props.dx || prevProps.dy !== this.props.dy) {
      return true;
    }

    if (prevState.position === this.state.position) {
      return true;
    }

    return false;
  };

  Overlay.prototype.unmountIfNecessary = function unmountIfNecessary() {
    if (!this.__overlay || !this.__node) {
      return;
    }

    _reactDom2.default.unmountComponentAtNode(this.__node);
    document.body.removeChild(this.__node);

    delete this.__node;
  };

  Overlay.prototype.handleDocumentClick = function handleDocumentClick(ev) {
    if (!this.props.visible) {
      return;
    }

    var target = ev.target;


    var anchor = _reactDom2.default.findDOMNode(this);
    var overlay = _reactDom2.default.findDOMNode(this.__overlay);

    if (target === anchor || target === overlay) {
      return;
    }

    if (anchor && anchor.contains(target)) {
      return;
    }

    if (overlay && overlay.contains(target)) {
      return;
    }

    this.props.onOutsideClick && this.props.onOutsideClick(ev);
  };

  Overlay.prototype.handleWindowResize = function handleWindowResize() {
    if (!this.props.visible) {
      return;
    }

    this.updatePosition();
  };

  Overlay.prototype.mountOrUpdate = function mountOrUpdate() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!this.__node) {
      this.__node = this.createContainer();
    }

    this.__overlay = _reactDom2.default.unstable_renderSubtreeIntoContainer(this, this.renderOverlay(props, state), this.__node);
  };

  Overlay.prototype.createContainer = function createContainer() {
    var div = document.createElement('div');

    document.body.appendChild(div);

    return div;
  };

  Overlay.prototype.updatePosition = function updatePosition() {
    var overlay = _reactDom2.default.findDOMNode(this.__overlay);
    var position = this.getOverlayPosition(overlay, this.getAnchorReference());

    if ((0, _lodash.isEqual)(this.state.position, position)) {
      return;
    }

    this.setState({ position: position });
  };

  Overlay.prototype.getAnchorReference = function getAnchorReference() {
    var node = _reactDom2.default.findDOMNode(this);

    var _$$offset = (0, _jquery2.default)(node).offset(),
        left = _$$offset.left,
        top = _$$offset.top;

    return {
      left: left,
      top: top,

      width: (0, _jquery2.default)(node).outerWidth(),
      height: (0, _jquery2.default)(node).outerHeight()
    };
  };

  Overlay.prototype.getOverlayPosition = function getOverlayPosition(overlay, reference) {
    var placement = this.props.placement;


    switch (placement) {
      case 'top':
        return this.getTopPosition(overlay, reference);
      case 'left':
        return this.getLeftPosition(overlay, reference);
      case 'bottom':
        return this.getBottomPosition(overlay, reference);
      case 'right':
        return this.getRightPosition(overlay, reference);
    }

    return {};
  };

  Overlay.prototype.getTopPosition = function getTopPosition(overlay, reference) {
    var _props = this.props,
        dx = _props.dx,
        dy = _props.dy,
        pushRight = _props.pushRight;
    var left = reference.left,
        width = reference.width;


    if (pushRight) {
      left = left + width - (0, _jquery2.default)(overlay).outerWidth();
    }

    return {
      left: left + dx,
      top: reference.top - (0, _jquery2.default)(overlay).outerHeight() + dy
    };
  };

  Overlay.prototype.getLeftPosition = function getLeftPosition(overlay, reference) {
    var _props2 = this.props,
        dx = _props2.dx,
        dy = _props2.dy;


    return {
      left: reference.left - (0, _jquery2.default)(overlay).outerWidth() + dx,
      top: this.getVerticalCenter(reference, overlay) + dy
    };
  };

  Overlay.prototype.getBottomPosition = function getBottomPosition(overlay, reference) {
    var _props3 = this.props,
        dx = _props3.dx,
        dy = _props3.dy,
        pushRight = _props3.pushRight;
    var left = reference.left,
        width = reference.width;


    if (pushRight) {
      left = left + width - (0, _jquery2.default)(overlay).outerWidth();
    }

    return {
      left: left + dx,
      top: reference.top + reference.height + dy
    };
  };

  Overlay.prototype.getRightPosition = function getRightPosition(overlay, reference) {
    var _props4 = this.props,
        dx = _props4.dx,
        dy = _props4.dy;


    return {
      left: reference.left + reference.width + dx,
      top: this.getVerticalCenter(reference, overlay) + dy
    };
  };

  Overlay.prototype.getVerticalCenter = function getVerticalCenter(reference, overlay) {
    return reference.top + reference.height / 2 - (0, _jquery2.default)(overlay).outerHeight() / 2;
  };

  Overlay.prototype.render = function render() {
    return _react.Children.only(this.props.children);
  };

  Overlay.prototype.renderOverlay = function renderOverlay(props, state) {
    return _react2.default.createElement(
      'div',
      {
        className: 'overlay overlay-' + props.placement,
        style: this.getStyle(props, state)
      },
      props.overlay
    );
  };

  Overlay.prototype.getStyle = function getStyle(_ref, _ref2) {
    var style = _ref.style;
    var position = _ref2.position;

    return (0, _extends3.default)({}, style.style, position);
  };

  return Overlay;
}(_react.Component);

Overlay.propTypes = {
  visible: _propTypes2.default.bool,
  pushRight: _propTypes2.default.bool,

  placement: _propTypes2.default.string,

  dx: _propTypes2.default.number,
  dy: _propTypes2.default.number,

  onOutsideClick: _propTypes2.default.func,

  children: _propTypes2.default.node
};
Overlay.defaultProps = {
  placement: 'bottom',

  dx: 0,
  dy: 0
};
exports.default = (0, _styles.defaultStyle)({
  position: 'absolute',
  zIndex: 2000
})(Overlay);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Overlay.js