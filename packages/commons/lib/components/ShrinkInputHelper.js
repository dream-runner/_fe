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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _substyle = require('substyle');

var _substyle2 = _interopRequireDefault(_substyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShrinkInputHelper = function (_Component) {
  (0, _inherits3.default)(ShrinkInputHelper, _Component);

  function ShrinkInputHelper() {
    (0, _classCallCheck3.default)(this, ShrinkInputHelper);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  ShrinkInputHelper.prototype.componentDidMount = function componentDidMount() {
    this.notifyChange();
  };

  ShrinkInputHelper.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.notifyChange();
    }
  };

  ShrinkInputHelper.prototype.notifyChange = function notifyChange() {
    this.props.onChange(this.helper.offsetWidth + 1);
  };

  ShrinkInputHelper.prototype.render = function render() {
    var _this2 = this;

    var style = this.props.style;

    var value = this.props.value || this.props.placeholder || '';

    value = value.replace(/ /g, '\xA0');

    return _react2.default.createElement(
      'span',
      (0, _extends3.default)({
        ref: function ref(helper) {
          return _this2.helper = helper;
        }
      }, style, {
        style: (0, _extends3.default)({}, style.style, {

          width: 'auto',
          whiteSpace: 'nowrap',
          visibility: 'hidden',
          position: 'absolute'
        })
      }),
      value
    );
  };

  return ShrinkInputHelper;
}(_react.Component);

ShrinkInputHelper.propTypes = {
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  readOnly: _propTypes2.default.bool
};
exports.default = (0, _substyle2.default)(ShrinkInputHelper);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ShrinkInputHelper.js