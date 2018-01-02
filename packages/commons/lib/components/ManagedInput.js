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

var _lodash = require('lodash');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ManagedInput = function (_Component) {
  (0, _inherits3.default)(ManagedInput, _Component);

  function ManagedInput() {
    (0, _classCallCheck3.default)(this, ManagedInput);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  ManagedInput.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement('input', (0, _extends3.default)({}, this.props, {
      ref: 'input',
      onKeyUp: function onKeyUp(event) {
        return _this2.handleKeyUp(event);
      }
    }));
  };

  ManagedInput.prototype.handleKeyUp = function handleKeyUp(event) {
    var _this3 = this;

    if (!_utils.KeyUtils.isEnter(event)) {
      return;
    }

    if (this.props.isValid === false) {
      return;
    }

    (0, _lodash.defer)(function () {
      _this3.refs.input.blur();
      _this3.refs.input.focus();
    });
  };

  return ManagedInput;
}(_react.Component);

ManagedInput.propTypes = {
  onComplete: _propTypes2.default.func,
  isValid: _propTypes2.default.bool
};
exports.default = ManagedInput;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ManagedInput.js