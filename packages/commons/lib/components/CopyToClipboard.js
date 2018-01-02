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

var _reactCopyToClipboard = require('react-copy-to-clipboard');

var _reactCopyToClipboard2 = _interopRequireDefault(_reactCopyToClipboard);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('../styles');

var _forms = require('./forms');

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _tiles = require('./tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CopyToClipboard = function (_Component) {
  (0, _inherits3.default)(CopyToClipboard, _Component);

  function CopyToClipboard() {
    (0, _classCallCheck3.default)(this, CopyToClipboard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args)));

    _this.state = {
      copied: false
    };
    return _this;
  }

  CopyToClipboard.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clearTimeout();
  };

  CopyToClipboard.prototype.clearTimeout = function clearTimeout() {
    if (this.hidePopoverTimeoutID) {
      window.clearTimeout(this.hidePopoverTimeoutID);
    }
  };

  CopyToClipboard.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        displayText = _props.displayText,
        popover = _props.popover,
        labelId = _props.labelId;
    var copied = this.state.copied;


    return _react2.default.createElement(
      _Popover2.default,
      {
        trigger: 'controlled',
        isOpen: copied,
        popover: popover || (0, _signavioI18n2.default)('Copied to clipboard'),
        inline: true
      },
      _react2.default.createElement(
        _reactCopyToClipboard2.default,
        {
          style: this.props.style,
          text: children,
          onCopy: function onCopy() {
            return _this2.handleCopy();
          }
        },
        _react2.default.createElement(
          _tiles.Tile,
          { style: this.props.style('tile'), icon: 'clipboard' },
          _react2.default.createElement('input', (0, _extends3.default)({}, this.props.style('input'), {
            readOnly: true,
            id: labelId,
            type: 'text',
            ref: function ref(_ref) {
              _this2.input = _ref;
            },
            onFocus: function onFocus(ev) {
              return _this2.setSelection(0, ev.target.value.length);
            },
            value: displayText || children
          }))
        )
      )
    );
  };

  CopyToClipboard.prototype.handleCopy = function handleCopy() {
    var _this3 = this;

    this.setState({
      copied: true
    });

    this.clearTimeout();

    this.hidePopoverTimeoutID = window.setTimeout(function () {
      return _this3.hidePopover();
    }, 2000);
  };

  CopyToClipboard.prototype.hidePopover = function hidePopover() {
    this.setState({
      copied: false
    });
  };

  CopyToClipboard.prototype.setSelection = function setSelection(selectionStart, selectionEnd) {
    if (selectionStart === null || selectionEnd === null) return;

    if (this.input.setSelectionRange) {
      this.input.setSelectionRange(selectionStart, selectionEnd);
    } else if (this.input.createTextRange) {
      var range = this.input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  };

  return CopyToClipboard;
}(_react.Component);

CopyToClipboard.propTypes = {
  children: _propTypes2.default.string.isRequired,
  displayText: _propTypes2.default.string,
  popover: _propTypes2.default.string
};

exports.default = (0, _recompose.compose)(_forms.withLabel, (0, _styles.defaultStyle)({
  cursor: 'pointer',

  input: {
    width: '100%',
    cursor: 'pointer',
    display: 'block'
  }
}))(CopyToClipboard);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/CopyToClipboard.js