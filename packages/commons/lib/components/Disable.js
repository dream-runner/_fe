'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _styles = require('../styles');

var _utils = require('../utils');

var _propTypes3 = require('../propTypes');

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var knowsPointerEvents = _utils.CSSUtils.knows('pointer-events', 'none');

var Disable = function (_Component) {
  (0, _inherits3.default)(Disable, _Component);

  function Disable() {
    (0, _classCallCheck3.default)(this, Disable);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Disable.prototype.render = function render() {
    var _props = this.props,
        disabled = _props.disabled,
        children = _props.children,
        rest = (0, _objectWithoutProperties3.default)(_props, ['disabled', 'children']);


    if (!disabled) {
      return _react2.default.createElement(
        'div',
        rest.style,
        children
      );
    }

    return this.wrapWithPopoverTrigger(_react2.default.createElement(
      'div',
      rest.style({ '&disabled': true }),
      children,
      this.renderMask()
    ));
  };

  Disable.prototype.renderMask = function renderMask() {
    if (knowsPointerEvents) {
      return null;
    }

    return _react2.default.createElement('div', {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        opacity: 0,
        zIndex: 99999
      }
    });
  };

  Disable.prototype.wrapWithPopoverTrigger = function wrapWithPopoverTrigger(content) {
    var _props2 = this.props,
        hint = _props2.hint,
        placement = _props2.placement;


    if (!hint) {
      return content;
    }

    return _react2.default.createElement(
      _Popover2.default,
      { small: true, position: placement, popover: this.props.hint },
      _react2.default.createElement(
        'div',
        null,
        content
      )
    );
  };

  return Disable;
}(_react.Component);

Disable.propTypes = (0, _defineProperty3.default)({
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.node,

  placement: _propTypes2.default.string,
  hint: _propTypes2.default.string

}, 'children', _propTypes2.default.node);
Disable.contextTypes = {
  features: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  token: _propTypes2.default.string,

  user: _propTypes3.User.isRequired,
  organization: _propTypes3.Organization.isRequired
};
Disable.defaultProps = {
  disabled: true,
  placement: 'top'
};


var styled = (0, _styles.defaultStyle)({
  '&disabled': {
    position: knowsPointerEvents ? undefined : 'relative',
    opacity: 0.5,
    pointerEvents: 'none'
  }
});

exports.default = styled(Disable);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Disable.js