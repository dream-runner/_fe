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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ui = require('@signavio/ui');

var _utils = require('../utils');

var _propTypes3 = require('../propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TileHeader = function (_Component) {
  (0, _inherits3.default)(TileHeader, _Component);

  function TileHeader() {
    (0, _classCallCheck3.default)(this, TileHeader);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  TileHeader.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        onClick = _props.onClick,
        icon = _props.icon,
        rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'onClick', 'icon']);


    var cls = _utils.CSSUtils.cls({
      'eff-tile-header': true,
      'eff-tile-action': !!onClick
    }, className);

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, rest, { className: cls, onClick: onClick }),
      this.renderIcon(icon),
      this.props.children
    );
  };

  TileHeader.prototype.renderIcon = function renderIcon(icon) {
    if (this.props.loading) {
      return _react2.default.createElement(
        'i',
        { className: 'icon' },
        _react2.default.createElement(_ui.Spinner, { className: 'loading-indicator' })
      );
    }

    if (!icon) {
      return;
    }

    return _react2.default.createElement('i', { className: 'icon ' + icon });
  };

  return TileHeader;
}(_react.Component);

TileHeader.propTypes = {
  icon: _propTypes2.default.string,
  userHint: _propTypes2.default.string,
  className: _propTypes2.default.string,

  user: _propTypes3.User,
  children: _propTypes2.default.node,

  loading: _propTypes2.default.bool,
  small: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  showUserHint: _propTypes2.default.bool,

  onClick: _propTypes2.default.func
};
exports.default = TileHeader;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/TileHeader.js