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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _ModalComponent = require('./ModalComponent');

var _ModalComponent2 = _interopRequireDefault(_ModalComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalProxy = function (_Component) {
  (0, _inherits3.default)(ModalProxy, _Component);

  function ModalProxy() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ModalProxy);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      visible: false,
      contentStyle: {}
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  ModalProxy.prototype.componentWillMount = function componentWillMount() {
    (0, _jquery2.default)('.outermost-container').addClass('blur');
    (0, _jquery2.default)('body').addClass('hideOverflow');

    this.show();
  };

  ModalProxy.prototype.componentDidMount = function componentDidMount() {
    var onShow = this.props.onShow;


    if (onShow) {
      onShow();
    }

    // FIXME
    // eslint-disable-next-line
    this.setState({
      visible: true
    });
  };

  ModalProxy.prototype.componentDidUpdate = function componentDidUpdate() {
    this.show();
  };

  ModalProxy.prototype.componentWillUnmount = function componentWillUnmount() {
    var _this2 = this;

    (0, _jquery2.default)('.outermost-container').removeClass('blur');
    (0, _jquery2.default)('body').removeClass('hideOverflow');

    this.setState({
      visible: false
    });

    var onHide = this.props.onHide;


    setTimeout(function () {
      _reactDom2.default.unmountComponentAtNode(_this2.node);
      if (document.body) {
        document.body.removeChild(_this2.node);
      }

      if (onHide) {
        onHide();
      }
    }, 300);
  };

  ModalProxy.prototype.render = function render() {
    return null;
  };

  ModalProxy.prototype.renderModal = function renderModal() {
    var _this3 = this;

    var _state = this.state,
        contentStyle = _state.contentStyle,
        bodyStyle = _state.bodyStyle,
        visible = _state.visible;
    var _props = this.props,
        style = _props.style,
        rest = (0, _objectWithoutProperties3.default)(_props, ['style']);


    return _react2.default.createElement(_ModalComponent2.default, (0, _extends3.default)({}, rest, {
      onSizeChange: function onSizeChange(size) {
        return _this3.handleSizeChange(size);
      },
      visible: visible,
      style: (0, _extends3.default)({}, style, {
        body: bodyStyle,
        content: contentStyle
      })
    }));
  };

  ModalProxy.prototype.show = function show() {
    if (!this.node) {
      this.node = document.createElement('div');
      if (document.body) {
        document.body.appendChild(this.node);
      }
    }

    _reactDom2.default.unstable_renderSubtreeIntoContainer(this, this.renderModal(), this.node);
  };

  ModalProxy.prototype.handleSizeChange = function handleSizeChange(size) {
    var body = size.body,
        header = size.header,
        footer = size.footer;


    var maxHeight = window.innerHeight;
    var height = body + header + footer;
    var contentStyle = this.state.contentStyle;

    // dialog does not fit, therefore fit to page and make scrollable

    if (height >= maxHeight) {
      if (contentStyle.height === maxHeight - 30) {
        return;
      }

      this.setState({
        contentStyle: {
          marginTop: 15,
          height: maxHeight - 30
        },
        bodyStyle: {
          height: maxHeight - header - footer - 30
        }
      });
    } else {
      if (contentStyle.marginTop === (maxHeight - height) / 2) {
        return;
      }

      this.setState({
        contentStyle: {
          marginTop: (maxHeight - height) / 2
        },
        bodyStyle: {}
      });
    }
  };

  return ModalProxy;
}(_react.Component);

exports.default = ModalProxy;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/modal/ModalProxy.js