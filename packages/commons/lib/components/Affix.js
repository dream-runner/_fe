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

var _bootstrap = require('bootstrap');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable */

var iFrameStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  visibility: 'hidden'
};

/* eslint-disable */

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      width: '100%'
    }, _this.handleScroll = function () {
      var monitorNode = _reactDom2.default.findDOMNode(_this.refs.monitor);

      if (_this.state.top !== (0, _jquery2.default)(monitorNode).offset().top) {
        _this.initAffix();
      }
    }, _this.handleReceive = function (event) {
      var data = event.data;
      if (data.id === 'Effektif.Affix.Resize') {
        _this.initAffix();
      }
    }, _this.initAffix = function () {
      var affixNode = _reactDom2.default.findDOMNode(_this.refs.affix);
      var monitorNode = _reactDom2.default.findDOMNode(_this.refs.monitor);
      var containerNode = _reactDom2.default.findDOMNode(_this.refs.container);

      var _this$props = _this.props,
          paddingTop = _this$props.paddingTop,
          paddingBottom = _this$props.paddingBottom;


      var offset = {
        top: function top() {
          return this.top = (0, _jquery2.default)(monitorNode).offset().top;
        },
        bottom: function bottom() {
          return this.bottom = (0, _jquery2.default)(document).height() + paddingBottom - ((0, _jquery2.default)(monitorNode).offset().top + (0, _jquery2.default)(monitorNode).outerHeight(true));
        }
      };

      if (!(0, _jquery2.default)(affixNode).data('bs.affix')) {
        (0, _jquery2.default)(affixNode).affix({
          offset: offset
        });
      } else {
        (0, _jquery2.default)(affixNode).data('bs.affix').options.offset = offset;
      }

      _this.setState({
        width: (0, _jquery2.default)(monitorNode).width(),
        height: (0, _jquery2.default)(containerNode).height(),
        top: (0, _jquery2.default)(monitorNode).offset().top
      });
    }, _this.handleAffix = function () {
      _this.setState({ height: (0, _jquery2.default)(_reactDom2.default.findDOMNode(_this.refs.affix)).height() });
    }, _this.handleUnfix = function () {
      _this.setState({ height: 'auto' });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.initAffix, false);
    window.addEventListener('message', this.handleReceive, false);
    window.addEventListener('scroll', this.handleScroll, false);
    this.initAffix();
  };

  _class.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.initAffix, false);
    window.removeEventListener('message', this.handleReceive, false);
    window.removeEventListener('scroll', this.handleScroll, false);
  };

  _class.prototype.render = function render() {
    var style = {
      paddingTop: this.props.paddingTop,
      width: this.state.width
    };
    var className = this.props.className;
    return _react2.default.createElement(
      'div',
      {
        className: 'affix-component ' + className,
        style: { minHeight: this.state.height },
        ref: 'container'
      },
      _react2.default.createElement('iframe', {
        ref: 'monitor',
        style: iFrameStyle,
        frameBorder: '0',
        src: 'javascript:window.onresize=function(){parent.postMessage({\'id\': \'Effektif.Affix.Resize\'}, \'*\')}'
      }),
      _react2.default.createElement(
        'div',
        { ref: 'affix', style: style },
        this.props.children
      )
    );
  };

  return _class;
}(_react2.default.Component);

_class.displayName = 'Affix';
_class.propTypes = {
  paddingTop: _propTypes2.default.number,
  paddingBottom: _propTypes2.default.number,

  className: _propTypes2.default.string,

  children: _propTypes2.default.node
};
_class.defaultProps = {
  paddingTop: 0,
  paddingBottom: 0,
  className: ''
};
exports.default = _class;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Affix.js