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

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactMentions = require('react-mentions');

var _styles = require('../styles');

var _tiles = require('./tiles');

var _hints = require('./hints');

var _MarkdownMentionsInput = require('./MarkdownMentionsInput');

var _MarkdownMentionsInput2 = _interopRequireDefault(_MarkdownMentionsInput);

var _MentionsInput = require('./MentionsInput');

var _MentionsInput2 = _interopRequireDefault(_MentionsInput);

var _Buffered = require('./Buffered');

var _Buffered2 = _interopRequireDefault(_Buffered);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BindingsTextInput = function (_Component) {
  (0, _inherits3.default)(BindingsTextInput, _Component);

  function BindingsTextInput() {
    (0, _classCallCheck3.default)(this, BindingsTextInput);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  BindingsTextInput.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        singleLine = _props.singleLine,
        value = _props.value,
        _onChange = _props.onChange,
        style = _props.style,
        setHasFocus = _props.setHasFocus,
        rest = (0, _objectWithoutProperties3.default)(_props, ['singleLine', 'value', 'onChange', 'style', 'setHasFocus']);


    var MentionComponent = singleLine ? _MentionsInput2.default : _MarkdownMentionsInput2.default;

    return _react2.default.createElement(
      'div',
      style,
      _react2.default.createElement(
        MentionComponent,
        (0, _extends3.default)({}, rest, {
          style: style('input'),
          singleLine: singleLine,
          onFocus: function onFocus(ev) {
            return _this2.handleFocus(ev);
          },
          onBlur: function onBlur(ev) {
            return _this2.handleBlur(ev);
          },
          value: value || '',
          onChange: function onChange(ev) {
            return _onChange(ev.target.value);
          },
          markup: '{{__id__}}',
          description: this.props.infoText,
          renderPreview: function renderPreview(val, props) {
            return _this2.renderPreview(val, props);
          },
          displayTransform: function displayTransform(id) {
            return _this2.transformDisplay(id);
          }
        }),
        _react2.default.createElement(_reactMentions.Mention, {
          style: style('mention'),
          trigger: '#',
          data: function data(query) {
            return _this2.requestBindables(query);
          },
          renderSuggestion: function renderSuggestion(suggestion, a, b, index) {
            return _this2.renderSuggestion(suggestion, index);
          }
        })
      ),
      this.renderInfo()
    );
  };

  BindingsTextInput.prototype.renderPreview = function renderPreview() {
    var _this3 = this;

    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var props = arguments[1];

    return value.replace(/\{\{(.*?)\}\}/gi, function (match, id) {
      var bindable = (0, _lodash.find)(_this3.props.bindables, { id: id });

      return _server2.default.renderToStaticMarkup(_react2.default.createElement(
        'span',
        props,
        bindable ? bindable.getName() : '???'
      ));
    });
  };

  BindingsTextInput.prototype.renderSuggestion = function renderSuggestion(_ref, index) {
    var id = _ref.id,
        display = _ref.display;

    var bindable = (0, _lodash.find)(this.props.bindables, { id: id });

    return _react2.default.createElement(
      _tiles.TextTile,
      {
        style: this.props.style('suggestion')({ '&first': index === 0 }),
        icon: bindable.getType().getIcon()
      },
      bindable.hasName() ? display : _react2.default.createElement(
        _hints.Hint,
        { inline: true },
        display
      )
    );
  };

  BindingsTextInput.prototype.renderInfo = function renderInfo() {
    if (!this.props.singleLine) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      this.props.style('info'),
      _react2.default.createElement(
        'small',
        null,
        this.props.infoText || (0, _signavioI18n2.default)('Press __key__ to insert information available in this process.', {
          key: _react2.default.createElement(
            'kbd',
            null,
            '#'
          )
        })
      )
    );
  };

  BindingsTextInput.prototype.handleFocus = function handleFocus(ev) {
    if (this.props.readOnly) {
      return;
    }

    this.props.setHasFocus(true);

    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }
  };

  BindingsTextInput.prototype.handleBlur = function handleBlur(ev) {
    this.props.setHasFocus(false);

    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  };

  BindingsTextInput.prototype.requestBindables = function requestBindables(query) {
    return (0, _lodash.chain)(this.props.bindables).filter(function (bindable) {
      return !query || bindable.getName().toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }).map(function (bindable) {
      return {
        id: bindable.id,
        display: bindable.getName()
      };
    }).value();
  };

  BindingsTextInput.prototype.transformDisplay = function transformDisplay(id) {
    var bindable = (0, _lodash.find)(this.props.bindables, { id: id });
    return bindable ? bindable.getName() : '???';
  };

  return BindingsTextInput;
}(_react.Component);

BindingsTextInput.defaultProps = {
  bindables: null,
  singleLine: false
};
BindingsTextInput.propTypes = {
  singleLine: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func
};


var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    mention: {
      backgroundColor: theme.color.primary.light
    },

    suggestion: {
      backgroundColor: null,
      marginTop: 1,

      '&first': {
        marginTop: 0
      }
    },

    info: (0, _extends3.default)({
      paddingLeft: theme.padding.normal,
      paddingRight: theme.padding.normal,

      backgroundColor: theme.color.mono.ultralight,

      lineHeight: _styles.variables.lineHeight.block / 2 + 'px',

      height: 0,

      overflow: 'hidden'

    }, _styles.utils.transition(['height', 'padding'])),

    input: {
      mentions: {
        '&multiLine': {
          input: {
            lineHeight: theme.lineHeight
          }
        }
      }
    },

    '&focus': {
      info: (0, _extends3.default)({}, _styles.utils.borderLeft('1px', 'solid', theme.color.mono.light), _styles.utils.borderRight('1px', 'solid', theme.color.mono.light), _styles.utils.borderBottom('1px', 'solid', theme.color.mono.light), {

        paddingTop: theme.padding.xsmall,
        paddingBottom: theme.padding.xsmall,

        height: _styles.variables.lineHeight.block / 2 + 2 * theme.padding.xsmall
      })
    }
  };
}, function (state) {
  return {
    '&focus': state.hasFocus
  };
});

exports.default = (0, _recompose.compose)((0, _recompose.withState)('hasFocus', 'setHasFocus', false), styled, _Buffered2.default)(BindingsTextInput);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/BindingsTextInput.js