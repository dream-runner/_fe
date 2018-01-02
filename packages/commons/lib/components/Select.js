'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('../utils');

var _Autocomplete = require('./Autocomplete');

var _Autocomplete2 = _interopRequireDefault(_Autocomplete);

var _tiles = require('./tiles');

var _forms = require('./forms');

var _buttons = require('./buttons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function (_Component) {
  (0, _inherits3.default)(Select, _Component);

  function Select(props) {
    (0, _classCallCheck3.default)(this, Select);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));

    _this.state = {
      open: props.autoFocus
    };
    return _this;
  }

  Select.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (!prevState.open && this.state.open) {
      this.refs.autocomplete.focus();
    }
  };

  Select.prototype.render = function render() {
    var cls = _utils.CSSUtils.cls({
      select: true
    }, this.props.className);

    return _react2.default.createElement(
      'div',
      { className: cls },
      _react2.default.createElement(
        _tiles.Tile,
        { toolbar: this.renderToggleButton() },
        this.state.open ? this.renderSelect() : this.renderValue()
      )
    );
  };

  Select.prototype.renderToggleButton = function renderToggleButton() {
    var open = this.state.open;
    var _props = this.props,
        readOnly = _props.readOnly,
        labelId = _props.labelId;


    return _react2.default.createElement(_buttons.IconButton, {
      ref: 'button',
      id: labelId,
      iconSet: 'fontAwesome',
      icon: open ? 'angle-up' : 'angle-down',
      disabled: readOnly,
      onClick: this.handleToggle.bind(this)
    });
  };

  Select.prototype.getVisibleValue = function getVisibleValue() {
    var value = this.props.value;

    if (this.props.renderValue) {
      return this.props.renderValue(value);
    }

    var option = (0, _lodash.find)(this.props.options, function (option) {
      return option.id === value;
    });

    if (option) {
      return option.value;
    }

    return value;
  };

  Select.prototype.renderValue = function renderValue() {
    var value = this.props.value;
    var renderedValue = this.getVisibleValue();

    if (!value || !this.props.renderSelection) {
      return _react2.default.createElement('input', {
        className: 'form-control',
        type: 'text',
        readOnly: true,
        autoComplete: 'off',
        disabled: this.props.readOnly,
        value: renderedValue,
        placeholder: this.props.placeholder,
        onClick: this.handleToggle.bind(this)
      });
    }

    return this.props.renderSelection(value);
  };

  Select.prototype.renderSelect = function renderSelect() {
    return _react2.default.createElement(
      _Autocomplete2.default,
      {
        ref: 'autocomplete',
        data: this.getOptions(),
        placeholder: this.getVisibleValue() || this.props.placeholder,
        renderItem: this.renderOption.bind(this),
        onComplete: this.handleComplete.bind(this),
        emptyText: this.props.emptyText || (0, _signavioI18n2.default)('Nothing found'),
        blurOnComplete: true,
        modalMode: true,
        hideTrigger: true,
        autoFocus: true,
        onFocus: this.props.onFocus,
        onBlur: this.handleBlur.bind(this)
      },
      this.props.children
    );
  };

  Select.prototype.getOptions = function getOptions() {
    if (this.props.value && this.props.allowClear) {
      return [this.getClearOption()].concat(this.props.options);
    }

    return this.props.options;
  };

  Select.prototype.getClearOption = function getClearOption() {
    return {
      id: '__clear__',
      value: this.renderClearButton()
    };
  };

  Select.prototype.renderClearButton = function renderClearButton() {
    return _react2.default.createElement(
      _tiles.ActionTile,
      { icon: 'times' },
      (0, _signavioI18n2.default)('Clear')
    );
  };

  Select.prototype.renderOption = function renderOption(item) {
    if (this.props.renderItem) {
      return this.props.renderItem(item);
    }

    if (item.id === '__clear__') {
      return item.value;
    }

    return _react2.default.createElement(
      _tiles.ActionTile,
      { subtitle: item.description, key: item.id },
      item.value || item.id
    );
  };

  Select.prototype.handleComplete = function handleComplete(item) {
    if (item.id === '__clear__') {
      item = null;
    }

    if (this.props.onChange) {
      this.props.onChange(item && item.id, item);
    }
  };

  Select.prototype.handleBlur = function handleBlur(ev) {
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }

    var buttonNode = _reactDom2.default.findDOMNode(this.refs.button);
    if (buttonNode && (ev.target === buttonNode || buttonNode.contains(ev.target))) {
      // button click will toggle the open state, so we shouldn't close right now
      return;
    }

    this.setState({
      open: false
    });
  };

  Select.prototype.handleToggle = function handleToggle(ev) {
    if (this.props.readOnly) {
      return;
    }

    ev.stopPropagation();
    ev.preventDefault();

    if (ev.nativeEvent && ev.nativeEvent.stopImmediatePropagation) {
      ev.nativeEvent.stopImmediatePropagation();
    }

    this.setState({
      open: !this.state.open
    });
  };

  return Select;
}(_react.Component);

Select.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    type: _propTypes2.default.string
  })).isRequired,

  allowClear: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  emptyText: _propTypes2.default.string,
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,

  renderValue: _propTypes2.default.func,
  renderSelection: _propTypes2.default.func,
  renderItem: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func
};
Select.defaultProps = {
  // an object with the values as keys and display labels as values
  options: []
};
exports.default = (0, _forms.withLabel)(Select);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Select.js