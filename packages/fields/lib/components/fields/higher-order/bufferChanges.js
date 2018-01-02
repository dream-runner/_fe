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

exports.default = bufferChanges;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// a HoC that keeps an internal state to buffer field value changes
// triggers onChange and clears the internal state in the field's onComplete
function bufferChanges(FieldComponent) {
  var ChangeBuffer = function (_PureComponent) {
    (0, _inherits3.default)(ChangeBuffer, _PureComponent);

    function ChangeBuffer() {
      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, ChangeBuffer);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = { value: undefined }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    ChangeBuffer.prototype.render = function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          onChange = _props.onChange,
          onComplete = _props.onComplete,
          rest = (0, _objectWithoutProperties3.default)(_props, ['value', 'onChange', 'onComplete']);

      return _react2.default.createElement(FieldComponent, (0, _extends3.default)({}, rest, {
        value: this.state.value === undefined ? value : this.state.value,
        onChange: function onChange(newValue) {
          return _this2.setState({ value: newValue });
        },
        onComplete: function (_onComplete) {
          function onComplete(_x) {
            return _onComplete.apply(this, arguments);
          }

          onComplete.toString = function () {
            return _onComplete.toString();
          };

          return onComplete;
        }(function (newValue) {
          if (onChange) {
            onChange(newValue);
          }

          if (onComplete) {
            onComplete(newValue);
          }

          _this2.setState({ value: undefined });
        })
      }));
    };

    return ChangeBuffer;
  }(_react.PureComponent);

  ChangeBuffer.displayName = 'bufferChanges(' + (FieldComponent.displayName || FieldComponent.name) + ')';

  return ChangeBuffer;
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/higher-order/bufferChanges.js