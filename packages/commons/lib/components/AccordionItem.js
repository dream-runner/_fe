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

var _tiles = require('./tiles');

var _buttons = require('./buttons');

var _hints = require('./hints');

var _Remove = require('./Remove');

var _Remove2 = _interopRequireDefault(_Remove);

var _Collapsible = require('./Collapsible');

var _Collapsible2 = _interopRequireDefault(_Collapsible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      expanded: !!_this.props.expanded
    }, _this.handleExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.handleCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.handleToggle = function (expanded) {
      if (_this.props.onToggle) {
        _this.props.onToggle(_this.props.model, expanded);
      }
    }, _this.renderTile = function () {
      var _this$props = _this.props,
          icon = _this$props.icon,
          iconSet = _this$props.iconSet;

      return _react2.default.createElement(
        _tiles.TextTile,
        { icon: icon, iconSet: iconSet, toolbar: _this.renderToolbar() },
        _this.renderTitle()
      );
    }, _this.getTitle = function () {
      return _this.props.value || _this.props.title;
    }, _this.renderTitle = function () {
      if (!_this.state.expanded && !_this.getTitle() && _this.props.emptyText) {
        return _react2.default.createElement(
          _hints.Hint,
          { inline: true },
          _this.props.emptyText
        );
      }

      if (!_this.state.expanded || _this.props.disabled) {
        return _react2.default.createElement(
          'div',
          null,
          _this.getTitle()
        );
      }

      return _react2.default.createElement('input', {
        ref: 'input',
        type: 'text',
        onClick: _this.handleInputSelect,
        onKeyDown: _this.props.onKeyDown,
        onBlur: _this.handleBlur,
        readOnly: _this.props.readOnly,
        placeholder: _this.props.placeholder,
        value: _this.props.value,
        onChange: _this.props.onChange,
        className: 'form-control'
      });
    }, _this.handleBlur = function (ev) {
      if (_this.props.onBlur) {
        _this.props.onBlur(ev, _this.props.model);
      }
    }, _this.handleInputSelect = function (ev) {
      // make sure to not close this accordion item as the click bubbles up to the header tile
      ev.stopPropagation();
    }, _this.renderToolbar = function () {
      if (_this.props.toolbar) {
        return _react2.default.createElement(
          _ui.List,
          { direction: 'horizontal' },
          _this.props.toolbar,
          _this.renderToggle()
        );
      }

      return _react2.default.createElement(
        _ui.List,
        null,
        _this.renderRemove(),
        _this.renderToggle()
      );
    }, _this.renderToggle = function () {
      if (_this.props.hideToggle) {
        return;
      }

      return _react2.default.createElement(_buttons.ExpandButton, { expanded: _this.state.expanded });
    }, _this.renderRemove = function () {
      return _react2.default.createElement(_Remove2.default, {
        key: 'remove',
        disabled: _this.props.readOnly,
        model: _this.props.model,
        onRemove: _this.props.onRemove
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.componentDidMount = function componentDidMount() {
    if (this.state.expanded && this.refs.input) {
      this.refs.input.focus();
    }
  };

  _class.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (!prevState.expanded && this.state.expanded) {
      if (!this.refs.input) {
        return;
      }

      this.refs.input.focus();
    }
  };

  _class.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        onBlur = _props.onBlur,
        onChange = _props.onChange,
        icon = _props.icon,
        style = _props.style,
        rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'children', 'onBlur', 'onChange', 'icon', 'style']);


    var cls = _utils.CSSUtils.cls({
      'accordion-item': true
    }, className);

    return _react2.default.createElement(
      'div',
      { className: cls, style: style },
      _react2.default.createElement(
        _Collapsible2.default,
        (0, _extends3.default)({}, rest, {
          header: this.renderTile(),
          onExpand: this.handleExpand,
          onCollapse: this.handleCollapse,
          onToggle: this.handleToggle
        }),
        this.state.expanded && children
      )
    );
  };

  return _class;
}(_react2.default.Component);

_class.displayName = 'AccordionItem';
_class.propTypes = {
  expanded: _propTypes2.default.bool.isRequired,

  animate: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  hideToggle: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,

  style: _propTypes2.default.object,

  emptyText: _propTypes2.default.string,
  icon: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  title: _propTypes2.default.string,
  value: _propTypes2.default.string,

  className: _propTypes2.default.string,

  onKeyDown: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onCollapse: _propTypes2.default.func,
  onRemove: _propTypes2.default.func,
  onToggle: _propTypes2.default.func,

  children: _propTypes2.default.node,
  header: _propTypes2.default.node,
  toolbar: _propTypes2.default.node
};
exports.default = _class;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/AccordionItem.js