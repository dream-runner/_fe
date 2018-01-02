'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _recompose = require('recompose');

var _styles = require('../../styles');

var _higherOrder = require('../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function (_Component) {
  (0, _inherits3.default)(Modal, _Component);

  function Modal() {
    (0, _classCallCheck3.default)(this, Modal);

    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat((0, _toConsumableArray3.default)(rest))));

    _this.checkSize = (0, _lodash.debounce)(_this.checkSize).bind(_this);
    return _this;
  }

  Modal.prototype.componentDidMount = function componentDidMount() {
    (0, _jquery2.default)(window).on('resize', this.checkSize);

    this.checkSize();
  };

  Modal.prototype.componentDidUpdate = function componentDidUpdate() {
    this.checkSize();
  };

  Modal.prototype.componentWillUnmount = function componentWillUnmount() {
    (0, _jquery2.default)(window).off('resize', this.checkSize);
  };

  Modal.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        title = _props.title,
        footer = _props.footer,
        children = _props.children,
        onSizeChange = _props.onSizeChange,
        visible = _props.visible,
        danger = _props.danger,
        onRequestHide = _props.onRequestHide,
        style = _props.style,
        rest = (0, _objectWithoutProperties3.default)(_props, ['title', 'footer', 'children', 'onSizeChange', 'visible', 'danger', 'onRequestHide', 'style']);


    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, rest, style, { onClick: onRequestHide }),
      _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, style('content'), {
          onClick: function onClick(ev) {
            return ev.stopPropagation();
          }
        }),
        title && _react2.default.createElement(
          'div',
          (0, _extends3.default)({
            ref: function ref(header) {
              _this2.header = header;
            }
          }, style('header')),
          _react2.default.createElement(
            'button',
            (0, _extends3.default)({}, style('close'), { onClick: onRequestHide }),
            '\xD7'
          ),
          _react2.default.createElement(
            'h4',
            style('title'),
            title
          )
        ),
        _react2.default.createElement(
          'div',
          (0, _extends3.default)({
            ref: function ref(body) {
              _this2.body = body;
            }
          }, style('body')),
          children
        ),
        footer && _react2.default.createElement(
          'div',
          (0, _extends3.default)({
            ref: function ref(footerRef) {
              _this2.footer = footerRef;
            }
          }, style('footer')),
          footer
        )
      )
    );
  };

  // refs


  Modal.prototype.checkSize = function checkSize() {
    var _props2 = this.props,
        title = _props2.title,
        footer = _props2.footer,
        onSizeChange = _props2.onSizeChange;


    var headerHeight = title ? (0, _jquery2.default)(this.header).outerHeight() : 0;
    var footerHeight = footer ? (0, _jquery2.default)(this.footer).outerHeight() : 0;

    var bodyHeight = (0, _jquery2.default)(this.body).outerHeight();

    onSizeChange({
      body: bodyHeight,
      header: headerHeight,
      footer: footerHeight
    });
  };

  return Modal;
}(_react.Component);
/* eslint-disable jsx-a11y/no-static-element-interactions */

var getModifiers = function getModifiers(props) {
  return {
    '&visible': props.visible,
    '&danger': props.danger
  };
};

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (theme, _ref) {
  var _ref$zIndex = _ref.zIndex,
      zIndex = _ref$zIndex === undefined ? 100 : _ref$zIndex;
  return (0, _extends3.default)({
    position: 'fixed',
    display: 'block',

    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: zIndex,

    opacity: 0,
    pointerEvents: 'all'

  }, _styles.utils.transition(['background', 'opacity']), {

    content: (0, _extends3.default)({
      position: 'relative',

      maxWidth: 600,

      marginLeft: 'auto',
      marginRight: 'auto',

      visibility: 'visible',

      pointerEvents: 'all',

      backgroundColor: 'white'

    }, _styles.utils.popover(theme.color), _styles.utils.transition('margin-top')),

    header: (0, _extends3.default)({
      paddingLeft: theme.padding.normal,
      paddingRight: theme.padding.normal,
      paddingBottom: theme.padding.normal,
      paddingTop: theme.padding.normal

    }, _styles.utils.borderBottom('1px', 'solid', theme.color.mono.light)),

    body: {
      paddingLeft: theme.padding.normal,
      paddingRight: theme.padding.normal,
      paddingBottom: theme.padding.normal,
      paddingTop: theme.padding.normal
    },

    close: {
      padding: 0,
      background: 'none',
      border: 0,

      float: 'right',

      opacity: 0.5,

      lineHeight: 1
    },

    '&visible': {
      opacity: 1,

      backgroundColor: (0, _color2.default)(theme.color.mono.ultradark).alpha(0.2).string(),

      body: {
        overflowY: 'auto'
      }
    },

    '&danger': {
      header: {
        backgroundColor: theme.color.status.danger
      },

      title: {
        color: _styles.utils.color(theme.color.status.danger)
      },

      close: {
        color: _styles.utils.color(theme.color.status.danger)
      }
    }
  });
}, getModifiers), (0, _higherOrder.omitProps)(['zIndex']))(Modal);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/modal/ModalComponent.js