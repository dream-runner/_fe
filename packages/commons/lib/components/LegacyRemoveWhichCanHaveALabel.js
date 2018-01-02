'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _utils = require('../utils');

var _buttons = require('./buttons');

var _tiles = require('./tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createReactClass2.default)({
  displayName: 'RemoveButton',

  propTypes: {
    icon: _propTypes2.default.string,
    className: _propTypes2.default.string,
    onRemove: _propTypes2.default.func,
    readOnly: _propTypes2.default.bool,
    children: _propTypes2.default.node
  },

  getInitialState: function getInitialState() {
    return {
      confirm: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      icon: 'icon signavio-icon icon-trash'
    };
  },

  render: function render() {
    var cls = _utils.CSSUtils.cls({
      'remove-button': true,
      confirm: this.state.confirm
    });

    if (this.state.confirm) {
      this.setTimer();
    }

    return _react2.default.createElement(
      _tiles.Tile,
      {
        className: cls,
        toolbar: this.renderToolbar(),
        onMouseMove: this.setTimer
      },
      _react2.default.createElement(
        _buttons.IconButton,
        {
          block: true,
          disabled: this.props.readOnly,
          icon: 'trash',
          light: true,
          onClick: this.requestConfirmation,
          right: true
        },
        this.props.children
      )
    );
  },

  renderToolbar: function renderToolbar() {
    return _react2.default.createElement(
      'div',
      { className: 'confirm-buttons clearfix' },
      _react2.default.createElement(_buttons.IconButton, { danger: true, icon: 'check', onClick: this.remove }),
      _react2.default.createElement(_buttons.IconButton, { icon: 'times', light: true, onClick: this.cancel })
    );
  },

  remove: function remove(ev) {
    window.clearTimeout(this.timer);

    ev.stopPropagation();
    ev.preventDefault();

    if (this.props.onRemove) {
      this.props.onRemove(this.props.model);

      return;
    }

    this.props.model.destroy();
  },

  cancel: function cancel(ev) {
    this.setState({
      confirm: false
    });

    ev.stopPropagation();
  },

  setTimer: function setTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(this.reset, 2000);
  },

  reset: function reset() {
    if (!this.isMounted()) {
      return;
    }

    this.setState({
      confirm: false
    });
  },

  requestConfirmation: function requestConfirmation(ev) {
    this.setState({
      confirm: true
    });

    ev.stopPropagation();
  }
});


// WEBPACK FOOTER //
// ./packages/commons/lib/components/LegacyRemoveWhichCanHaveALabel.js