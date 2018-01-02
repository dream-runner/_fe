'use strict';

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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NODE;

var AlertComponent = function (_React$Component) {
  (0, _inherits3.default)(AlertComponent, _React$Component);

  function AlertComponent() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AlertComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderFooter = function () {
      return _react2.default.createElement(
        'button',
        { className: 'btn btn-text', onClick: _this.hide },
        _this.props.button || (0, _signavioI18n2.default)('OK')
      );
    }, _this.hide = function () {
      (0, _lodash.defer)(function () {
        _reactDom2.default.unmountComponentAtNode(NODE);

        document.body.removeChild(NODE);
      }.bind(_this));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  AlertComponent.prototype.render = function render() {
    return _react2.default.createElement(
      _modal2.default,
      {
        title: this.props.title,
        footer: this.renderFooter(),
        className: 'modal-alert',
        onRequestHide: this.hide
      },
      this.props.children
    );
  };

  return AlertComponent;
}(_react2.default.Component);

AlertComponent.displayName = 'Alert';
AlertComponent.propTypes = {
  title: _propTypes2.default.string,
  button: _propTypes2.default.string,
  children: _propTypes2.default.node
};


module.exports = function alert(message, title) {
  NODE = (0, _jquery2.default)('<div />').appendTo('body').get(0);

  var content = (0, _lodash.isString)(message) ? _react2.default.createElement(
    'p',
    null,
    message
  ) : message;

  _reactDom2.default.render(_react2.default.createElement(
    AlertComponent,
    { title: title },
    content
  ), NODE);
};


// WEBPACK FOOTER //
// ./packages/commons/lib/components/alert.js