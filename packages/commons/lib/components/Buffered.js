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

exports.default = Buffered;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Buffered(BufferedComponent) {
  var ValueBuffer = function (_Component) {
    (0, _inherits3.default)(ValueBuffer, _Component);

    function ValueBuffer(props) {
      (0, _classCallCheck3.default)(this, ValueBuffer);

      var _this = (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));

      _this.state = { value: null };
      _this._nextState = { value: null };


      _this.state = {
        value: props.value
      };

      _this._lastPublishedValue = props.value;
      return _this;
    }

    ValueBuffer.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
      if (nextProps.value !== this.props.value && nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.value });

        this._lastPublishedValue = nextProps.value;
      }
    };

    ValueBuffer.prototype.componentWillUnmount = function componentWillUnmount() {
      var value = this.getLatestValue();
      if (value !== this._lastPublishedValue) {
        this.props.onChange(value);
        this._lastPublishedValue = value;
      }
    };

    ValueBuffer.prototype.getLatestValue = function getLatestValue() {
      return this._inStateTransition ? this._nextState.value : this.state.value;
    };

    ValueBuffer.prototype.render = function render() {
      var _this2 = this;

      var _props = this.props,
          onChange = _props.onChange,
          onBlur = _props.onBlur,
          rest = (0, _objectWithoutProperties3.default)(_props, ['onChange', 'onBlur']);
      var value = this.state.value;


      return _react2.default.createElement(BufferedComponent, (0, _extends3.default)({}, rest, {
        value: value,
        onChange: function onChange(value) {
          _this2._inStateTransition = true;
          _this2._nextState = { value: value };

          _this2.setState({ value: value }, function () {
            delete _this2._inStateTransition;
            delete _this2._nextState;
          });
        },
        onBlur: function (_onBlur) {
          function onBlur(_x) {
            return _onBlur.apply(this, arguments);
          }

          onBlur.toString = function () {
            return _onBlur.toString();
          };

          return onBlur;
        }(function (ev) {
          var value = _this2.getLatestValue();

          if (value !== _this2._lastPublishedValue) {
            onChange(value);
            _this2._lastPublishedValue = value;
          }
          if (onBlur) {
            onBlur(ev);
          }
        })
      }));
    };

    return ValueBuffer;
  }(_react.Component);

  ValueBuffer.displayName = (BufferedComponent.displayName || BufferedComponent.name) + 'ValueBuffer';

  return ValueBuffer;
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Buffered.js