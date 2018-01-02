'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _hints = require('./hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InfiniteScroll = function (_Component) {
  (0, _inherits3.default)(InfiniteScroll, _Component);

  function InfiniteScroll() {
    (0, _classCallCheck3.default)(this, InfiniteScroll);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));

    _this.props = {
      threshold: 250,

      page: 0,

      onPageEnd: function onPageEnd() {},

      isLoaded: true,
      isLoading: false
    };


    _this.checkForUpdate = (0, _lodash.debounce)(_this.checkForUpdate.bind(_this), 150);
    return _this;
  }

  InfiniteScroll.prototype.componentDidMount = function componentDidMount() {
    (0, _jquery2.default)(window).scroll(this.checkForUpdate);
    (0, _jquery2.default)(window).resize(this.checkForUpdate);

    this.checkForUpdate();
  };

  InfiniteScroll.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var page = this.props.page;


    if (page === prevProps.page) {
      return;
    }

    this.checkForUpdate();
  };

  InfiniteScroll.prototype.componentWillUnmount = function componentWillUnmount() {
    (0, _jquery2.default)(window).off('scroll', this.checkForUpdate);
    (0, _jquery2.default)(window).off('resize', this.checkForUpdate);

    this.checkForUpdate.cancel();
  };

  InfiniteScroll.prototype.checkForUpdate = function checkForUpdate() {
    var _props = this.props,
        _props$threshold = _props.threshold,
        threshold = _props$threshold === undefined ? 250 : _props$threshold,
        isLoaded = _props.isLoaded,
        isLoading = _props.isLoading,
        onPageEnd = _props.onPageEnd;


    if (isLoaded || isLoading) {
      return;
    }

    var node = _reactDom2.default.findDOMNode(this);

    var offset = (0, _jquery2.default)(node).offset().top + (0, _jquery2.default)(node).height();
    var scrollTop = (0, _jquery2.default)(document).scrollTop();

    if (offset - scrollTop - window.innerHeight > threshold) {
      return;
    }

    onPageEnd();
  };

  InfiniteScroll.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        isLoaded = _props2.isLoaded,
        loadingMessage = _props2.loadingMessage,
        isLoading = _props2.isLoading,
        onPageEnd = _props2.onPageEnd,
        page = _props2.page,
        rest = (0, _objectWithoutProperties3.default)(_props2, ['children', 'isLoaded', 'loadingMessage', 'isLoading', 'onPageEnd', 'page']);


    return _react2.default.createElement(
      'div',
      rest,
      children,
      !isLoaded && _react2.default.createElement(
        _hints.Hint,
        { loading: true },
        loadingMessage || (0, _signavioI18n2.default)('Loading additional contents...')
      )
    );
  };

  return InfiniteScroll;
}(_react.Component);

exports.default = InfiniteScroll;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/NewInfiniteScroll.js