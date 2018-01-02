'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModifiers = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

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

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('../styles');

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Empty = require('./Empty');

var _Empty2 = _interopRequireDefault(_Empty);

var _tiles = require('./tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InplaceEdit = function (_Component) {
  (0, _inherits3.default)(InplaceEdit, _Component);

  function InplaceEdit(props) {
    (0, _classCallCheck3.default)(this, InplaceEdit);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      editing: props.editing,
      value: props.value
    };
    return _this;
  }

  InplaceEdit.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if (newProps.editing) {
      this.setState({
        editing: true
      });
    }
    if (newProps.readOnly) {
      this.setState({
        editing: false
      });
    }
    if (newProps.value !== this.props.value && newProps.value !== this.state.value) {
      this.setState({
        value: newProps.value
      });
    }
  };

  InplaceEdit.prototype.render = function render() {
    if (this.state.editing) {
      return this.renderInput();
    }

    return this.renderTile();
  };

  InplaceEdit.prototype.renderInput = function renderInput() {
    var _this2 = this;

    var _props = this.props,
        onBlur = _props.onBlur,
        onKeyDown = _props.onKeyDown,
        className = _props.className,
        children = _props.children,
        editing = _props.editing,
        multiLine = _props.multiLine,
        rest = (0, _objectWithoutProperties3.default)(_props, ['onBlur', 'onKeyDown', 'className', 'children', 'editing', 'multiLine']);

    var inputProps = (0, _extends4.default)({}, rest, this.props.style(getModifiers(this.props, this.state, 'input')), {
      autoFocus: true,
      onBlur: function onBlur(ev) {
        return _this2.handleBlur(ev);
      },
      onKeyDown: function onKeyDown(ev) {
        return _this2.handleKeyDown(ev);
      },
      onChange: function onChange(ev) {
        return _this2.handleChange(ev);
      },
      value: this.state.value
    });

    return _react2.default.createElement(
      'div',
      this.props.style(getModifiers(this.props, this.state)),
      multiLine ? _react2.default.createElement(_reactTextareaAutosize2.default, inputProps) : _react2.default.createElement('input', (0, _extends4.default)({}, inputProps, { type: 'text' }))
    );
  };

  InplaceEdit.prototype.renderTile = function renderTile() {
    var _this3 = this;

    var _props2 = this.props,
        placeholder = _props2.placeholder,
        multiLine = _props2.multiLine,
        children = _props2.children,
        readOnly = _props2.readOnly;
    var value = this.state.value;

    var isEmpty = (0, _lodash.trim)(value) === '';
    var TileComponent = !multiLine || isEmpty ? _tiles.TextTile : _tiles.Tile;

    return _react2.default.createElement(
      TileComponent,
      {
        style: this.props.style(getModifiers(this.props, this.state)),
        onClick: function onClick(ev) {
          return _this3.handleClick(ev);
        },
        toolbar: !readOnly && _react2.default.createElement(_Icon2.default, {
          style: this.props.style(getModifiers(this.props, this.state, 'icon')),
          icon: 'pencil',
          iconSet: 'fontAwesome'
        })
      },
      isEmpty && _react2.default.createElement(
        _Empty2.default,
        {
          style: this.props.style(getModifiers(this.props, this.state, 'placeholder'))
        },
        placeholder || (0, _signavioI18n2.default)('Click to edit')
      ),
      !isEmpty && (0, _lodash.isFunction)(children) ? children(value) : children || value
    );
  };

  InplaceEdit.prototype.handleChange = function handleChange(ev) {
    this.setState({
      value: ev.target.value
    });

    if (this.props.onChange) {
      this.props.onChange(ev);
    }
  };

  InplaceEdit.prototype.handleClick = function handleClick(ev) {
    ev.stopPropagation();

    if (!this.props.readOnly) {
      this.setState({
        editing: true
      });
    }

    if ((0, _lodash.isFunction)(this.props.onClick)) {
      this.props.onClick(ev);
    }
  };

  InplaceEdit.prototype.handleBlur = function handleBlur(ev) {
    this.setState({
      editing: false
    });

    if ((0, _lodash.isFunction)(this.props.onBlur)) {
      this.props.onBlur(ev);
    }
  };

  InplaceEdit.prototype.handleKeyDown = function handleKeyDown(ev) {
    if (ev.keyCode === 13 && !this.props.multiLine) {
      // enter pressed, disabled for multiLine prop
      ev.target.blur();
    }

    if ((0, _lodash.isFunction)(this.props.onKeyDown)) {
      this.props.onKeyDown(ev);
    }
  };

  return InplaceEdit;
}(_react.Component);

InplaceEdit.propTypes = {
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  multiLine: _propTypes2.default.bool,
  editing: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func
};
var getModifiers = exports.getModifiers = function getModifiers(props, state) {
  for (var _len = arguments.length, modifiers = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    modifiers[_key - 2] = arguments[_key];
  }

  return (0, _extends4.default)({}, modifiers.reduce(function (result, modifier) {
    return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, modifier, true));
  }, {}), {

    '&multiLine': props.multiLine,
    '&readOnly': props.readOnly,
    '&editing': state.editing
  });
};

var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    cursor: 'pointer',
    backgroundColor: 'none',
    textAlign: 'left',

    input: {
      width: '100%',
      verticalAlign: 'middle'
    },

    icon: (0, _extends4.default)({
      color: theme.color.mono.middle,
      marginLeft: -_styles.padding.normal,
      opacity: 0.5

    }, _styles.utils.transition('opacity'), {

      ':hover': {
        opacity: 1
      }
    }),

    placeholder: (0, _extends4.default)({}, _styles.utils.ellipsis()),

    '&readOnly': {
      cursor: 'default'
    },

    '&multiLine': {
      tile: {
        textAlign: 'left'
      },

      input: {
        overflow: 'hidden',
        whiteSpace: 'normal'
      },

      icon: {
        marginLeft: null
      }
    }
  };
});

exports.default = styled(InplaceEdit);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/InplaceEdit.js