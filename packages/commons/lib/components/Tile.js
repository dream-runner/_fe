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

var _lodash = require('lodash');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('../utils');

var _propTypes3 = require('../propTypes');

var _TileHeader = require('./TileHeader');

var _TileHeader2 = _interopRequireDefault(_TileHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tile = function (_Component) {
  (0, _inherits3.default)(Tile, _Component);

  function Tile() {
    (0, _classCallCheck3.default)(this, Tile);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Tile.prototype.render = function render() {
    var cls = _utils.CSSUtils.cls({
      'eff-tile-row': true,
      'eff-tile-small': this.props.small,
      'eff-tile-white': this.props.white,
      'eff-tile-draggable': this.props.draggable,
      'eff-tile-action': this.props.onClick,
      'no-wrap': this.mustWrapContent(),
      padding: this.needsPadding()
    }, this.props.className);

    return _react2.default.createElement(
      'div',
      {
        className: cls,
        onClick: this.handleClick.bind(this),
        onMouseOver: this.props.onMouseOver,
        onMouseOut: this.props.onMouseOut
      },
      this.renderDraggable(),
      this.renderHeader(),
      this.renderToolbar(),
      this.renderContent()
    );
  };

  Tile.prototype.handleClick = function handleClick(event) {
    if (this.props.onHeaderClick && this.clickOnHeader(event)) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  Tile.prototype.clickOnHeader = function clickOnHeader(event) {
    var node = _reactDom2.default.findDOMNode(this);

    if (event.target === node) {
      return false;
    }

    if ((0, _jquery2.default)(event.target).parents('.eff-tile-header').length === 0) {
      return false;
    }

    return true;
  };

  Tile.prototype.mustWrapContent = function mustWrapContent() {
    if (!(0, _lodash.isUndefined)(this.props.noWrap)) {
      return this.props.noWrap;
    }

    return typeof this.props.children === 'string' && !this.props.toolbar;
  };

  Tile.prototype.needsPadding = function needsPadding() {
    return typeof this.props.children === 'string' || this.props.padding;
  };

  Tile.prototype.renderDraggable = function renderDraggable() {
    if (!this.props.draggable) {
      return;
    }

    return _react2.default.createElement(
      'a',
      { className: 'draggable-handle' },
      _react2.default.createElement('i', { className: 'icon fa fa-bars' })
    );
  };

  Tile.prototype.renderHeader = function renderHeader() {
    if (this.props.header) {
      return this.props.header;
    }

    var _props = this.props,
        headerClassName = _props.headerClassName,
        onHeaderClick = _props.onHeaderClick,
        children = _props.children,
        icon = _props.icon,
        user = _props.user,
        rest = (0, _objectWithoutProperties3.default)(_props, ['headerClassName', 'onHeaderClick', 'children', 'icon', 'user']);


    if (!icon && !user) {
      return;
    }

    return _react2.default.createElement(_TileHeader2.default, (0, _extends3.default)({
      key: 'header'
    }, rest, {
      icon: icon,
      user: this.getUser(user),
      className: headerClassName,
      onClick: onHeaderClick
    }));
  };

  Tile.prototype.getUser = function getUser(user) {
    if (!user) {
      return;
    }

    if (user.toJSON) {
      return user.toJSON();
    }

    return user;
  };

  Tile.prototype.renderContent = function renderContent() {
    if (!this.props.children) {
      return;
    }

    return _react2.default.createElement(
      'div',
      { key: 'content', className: 'eff-tile-content' },
      this.renderChildren()
    );
  };

  Tile.prototype.renderChildren = function renderChildren() {
    if (!this.props.subtitle) {
      return this.props.children;
    }

    return _react2.default.createElement(
      'div',
      { className: 'title' },
      _react2.default.createElement(
        'div',
        null,
        this.props.children
      ),
      _react2.default.createElement(
        'div',
        { className: 'subtitle' },
        this.props.subtitle
      )
    );
  };

  Tile.prototype.renderToolbar = function renderToolbar() {
    if (!this.props.toolbar) {
      return;
    }

    return _react2.default.createElement(
      'div',
      { className: 'eff-tile-toolbar' },
      this.props.toolbar
    );
  };

  return Tile;
}(_react.Component);

Tile.propTypes = {
  icon: _propTypes2.default.string,
  className: _propTypes2.default.string,
  headerClassName: _propTypes2.default.string,

  subtitle: _propTypes2.default.node,
  toolbar: _propTypes2.default.node,
  header: _propTypes2.default.node,
  children: _propTypes2.default.node,

  small: _propTypes2.default.bool,
  white: _propTypes2.default.bool,
  draggable: _propTypes2.default.bool,
  noWrap: _propTypes2.default.bool,
  padding: _propTypes2.default.bool,

  onClick: _propTypes2.default.func,
  onMouseOver: _propTypes2.default.func,
  onMouseOut: _propTypes2.default.func,
  onHeaderClick: _propTypes2.default.func,

  user: _propTypes2.default.oneOfType([_propTypes3.User, _propTypes2.default.object])
};
exports.default = Tile;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Tile.js