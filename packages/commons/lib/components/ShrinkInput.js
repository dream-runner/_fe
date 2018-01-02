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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _styles = require('../styles');

var _ShrinkInputHelper = require('./ShrinkInputHelper');

var _ShrinkInputHelper2 = _interopRequireDefault(_ShrinkInputHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getValue = function getValue(_ref) {
  var value = _ref.value,
      defaultValue = _ref.defaultValue;
  return value != null ? value : defaultValue;
};

var ShrinkInput = function (_Component) {
  (0, _inherits3.default)(ShrinkInput, _Component);

  function ShrinkInput(props) {
    (0, _classCallCheck3.default)(this, ShrinkInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      value: getValue(props)
    };
    return _this;
  }

  ShrinkInput.prototype.componentDidMount = function componentDidMount() {
    this.renderHelper(this.props, getValue(this.props));
  };

  ShrinkInput.prototype.componentWilLReceiveProps = function componentWilLReceiveProps(nextProps) {
    var currentValue = getValue(this.props);
    var nextValue = getValue(nextProps);

    if (currentValue !== nextValue) {
      this.renderHelper(nextProps, nextValue);
      this.setState({
        value: nextValue
      });
    }
  };

  ShrinkInput.prototype.componentDidUpdate = function componentDidUpdate() {
    var _props = this.props,
        style = _props.style,
        minFontSize = _props.minFontSize,
        autoGrow = _props.autoGrow,
        width = _props.width,
        currentFontSize = _props.fontSize,
        setFontSize = _props.setFontSize;

    var inputWidth = this.input.offsetWidth;

    var factor = 1;

    if (autoGrow || width > inputWidth) {
      factor = Math.min(1, inputWidth / width);
    }

    var fontSize = parseInt(style.style.fontSize, 10);

    var newFontSize = Math.max(Math.floor(fontSize * factor), parseInt(minFontSize, 10));

    if (newFontSize === currentFontSize) {
      return;
    }

    setFontSize(newFontSize);
  };

  ShrinkInput.prototype.componentWillUnmount = function componentWillUnmount() {
    this.removeHelper();
  };

  ShrinkInput.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        readOnly = _props2.readOnly,
        style = _props2.style,
        light = _props2.light,
        autoGrow = _props2.autoGrow,
        minFontSize = _props2.minFontSize,
        width = _props2.width,
        fontSize = _props2.fontSize,
        rest = (0, _objectWithoutProperties3.default)(_props2, ['readOnly', 'style', 'light', 'autoGrow', 'minFontSize', 'width', 'fontSize']);
    var value = this.state.value;


    var props = (0, _lodash.omit)(rest, ['width', 'setWidth', 'fontSize', 'setFontSize', 'defaultValue']);

    if (readOnly) {
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, style, {
          style: (0, _extends3.default)({}, style.style, {

            width: width,
            maxWidth: '100%',
            fontSize: fontSize
          }),
          ref: function ref(input) {
            return _this2.input = input;
          }
        }),
        value || (0, _signavioI18n2.default)('Unnamed task')
      );
    }

    return _react2.default.createElement('input', (0, _extends3.default)({
      type: 'text'
    }, props, style, {
      style: (0, _extends3.default)({}, style.style, {

        width: width,
        maxWidth: '100%',
        fontSize: fontSize
      }),
      value: value,
      onChange: function onChange(ev) {
        return _this2.handleChange(ev);
      },
      ref: function ref(input) {
        return _this2.input = input;
      }
    }));
  };

  ShrinkInput.prototype.renderHelper = function renderHelper(props, value) {
    var _this3 = this;

    var placeholder = props.placeholder,
        style = props.style;


    _reactDom2.default.unstable_renderSubtreeIntoContainer(this, _react2.default.createElement(_ShrinkInputHelper2.default, {
      style: style,
      value: value,
      placeholder: placeholder,
      onChange: function onChange(width) {
        return _this3.updateSize(width);
      }
    }), this.createHelperNode());
  };

  ShrinkInput.prototype.removeHelper = function removeHelper() {
    var node = this.createHelperNode();

    _reactDom2.default.unmountComponentAtNode(node);

    document.body.removeChild(node);
  };

  ShrinkInput.prototype.createHelperNode = function createHelperNode() {
    if (this.__node) {
      return this.__node;
    }

    this.__node = document.createElement('div');

    document.body.appendChild(this.__node);

    return this.__node;
  };

  ShrinkInput.prototype.handleChange = function handleChange(ev) {
    this.renderHelper(this.props, ev.target.value);
    this.setState({
      value: ev.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(ev);
    }
  };

  ShrinkInput.prototype.updateSize = function updateSize(newWidth) {
    var _props3 = this.props,
        setWidth = _props3.setWidth,
        width = _props3.width;


    if (newWidth <= this.input.offsetWidth) {
      if ((0, _lodash.isEqual)(newWidth, width)) {
        return;
      }

      setWidth(newWidth);
    } else {
      setWidth(newWidth);
    }
  };

  return ShrinkInput;
}(_react.Component);

ShrinkInput.propTypes = {
  minFontSize: _propTypes2.default.number,

  autoGrow: _propTypes2.default.bool,

  readOnly: _propTypes2.default.bool,

  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func
};
exports.default = (0, _recompose.compose)((0, _recompose.withState)('width', 'setWidth'), (0, _recompose.withState)('fontSize', 'setFontSize'), (0, _recompose.defaultProps)({
  minFontSize: 10,
  className: 'shrink-input'
}), (0, _styles.defaultStyle)(function (_ref2) {
  var padding = _ref2.padding,
      theme = (0, _objectWithoutProperties3.default)(_ref2, ['padding']);
  return (0, _extends3.default)({}, (0, _lodash.merge)(_styles.utils.input((0, _extends3.default)({ padding: padding }, theme)), {
    paddingLeft: padding.normal + 1,

    '&readOnly': (0, _extends3.default)({}, _styles.utils.ellipsis())
  }));
}, function (_ref3) {
  var readOnly = _ref3.readOnly;
  return {
    '&readOnly': readOnly
  };
}))(ShrinkInput);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ShrinkInput.js