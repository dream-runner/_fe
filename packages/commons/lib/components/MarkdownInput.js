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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _styles = require('../styles');

var _tabs = require('./tabs');

var _hints = require('./hints');

var _Markdown = require('./Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkdownInput = function (_Component) {
  (0, _inherits3.default)(MarkdownInput, _Component);

  function MarkdownInput() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MarkdownInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { showPreview: false }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  MarkdownInput.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (nextState.showPreview && !this.state.showPreview) {
      this.setState({
        previewHeight: (0, _jquery2.default)(_reactDom2.default.findDOMNode(this.refs.content)).outerHeight()
      });
    }
  };

  MarkdownInput.prototype.render = function render() {
    var _this2 = this;

    var showPreview = this.state.showPreview;


    return _react2.default.createElement(
      'div',
      this.props.style,
      _react2.default.createElement(
        _tabs.TabBar,
        { style: this.props.style('tabbar') },
        _react2.default.createElement(
          _tabs.Tab,
          {
            small: true,
            style: this.props.style('tab'),
            active: !showPreview,
            onClick: function onClick() {
              return _this2.setState({ showPreview: false });
            }
          },
          (0, _signavioI18n2.default)('Write')
        ),
        _react2.default.createElement(
          _tabs.Tab,
          {
            small: true,
            style: this.props.style('tab'),
            active: showPreview,
            onClick: function onClick() {
              return _this2.setState({ showPreview: true });
            }
          },
          (0, _signavioI18n2.default)('Preview')
        )
      ),
      this.renderInput(),
      this.renderFooter()
    );
  };

  MarkdownInput.prototype.renderFooter = function renderFooter() {
    return _react2.default.createElement(
      'div',
      this.props.style('footer'),
      this.renderDescription(),
      _react2.default.createElement(
        'p',
        null,
        (0, _signavioI18n2.default)('You can use <a href="http://daringfireball.net/projects/markdown/basics" target="_blank">Markdown</a> for formatting.', {
          markdown: true
        })
      )
    );
  };

  MarkdownInput.prototype.renderDescription = function renderDescription() {
    var description = this.props.description;


    if (!description) {
      return;
    }

    return _react2.default.createElement(
      'p',
      this.props.style('description'),
      description
    );
  };

  MarkdownInput.prototype.renderInput = function renderInput() {
    var _state = this.state,
        showPreview = _state.showPreview,
        _state$previewHeight = _state.previewHeight,
        previewHeight = _state$previewHeight === undefined ? 0 : _state$previewHeight;
    var children = this.props.children;


    if (showPreview) {
      return this.renderPreview();
    }

    if (children) {
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, this.props.style('content'), { ref: 'content' }),
        children
      );
    }

    var _props$style = this.props.style(['content', 'textarea']),
        style = _props$style.style,
        className = _props$style.className;

    return _react2.default.createElement(_reactTextareaAutosize2.default, (0, _extends3.default)({
      ref: 'content'
    }, this.props, {
      className: className,
      style: (0, _extends3.default)({}, style, {

        minHeight: Math.max(style.minHeight || 0, previewHeight)
      })
    }));
  };

  MarkdownInput.prototype.renderPreview = function renderPreview() {
    var renderPreview = this.props.renderPreview;

    var value = this.props.value;

    if (renderPreview) {
      value = renderPreview((0, _Markdown.escape)(value));
    }

    if (!value) {
      return _react2.default.createElement(
        'div',
        this.props.style('preview'),
        _react2.default.createElement(
          _hints.Hint,
          null,
          (0, _signavioI18n2.default)('Nothing to preview')
        )
      );
    }

    var _state$previewHeight2 = this.state.previewHeight,
        previewHeight = _state$previewHeight2 === undefined ? 0 : _state$previewHeight2;

    var _props$style2 = this.props.style('preview'),
        style = _props$style2.style,
        className = _props$style2.className;

    return _react2.default.createElement(
      _Markdown2.default,
      {
        className: className,
        style: (0, _extends3.default)({}, style, {

          minHeight: Math.max(style.minHeight || 0, previewHeight)
        }),
        unsafe: !!renderPreview
      },
      value
    );
  };

  return MarkdownInput;
}(_react.Component);

var tabHeight = _styles.variables.lineHeight.block / 2 + 2 * _styles.padding.xsmall;

var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    textAlign: 'left',

    footer: (0, _extends3.default)({
      fontSize: _styles.font.size.small

    }, _styles.utils.border('1px', 'solid', theme.color.mono.lighter), {
      borderTop: 'none',

      backgroundColor: theme.color.mono.ultralight,

      paddingLeft: _styles.padding.normal,
      paddingRight: _styles.padding.normal,
      paddingTop: _styles.padding.xsmall,
      paddingBottom: _styles.padding.xsmall
    }),

    tabbar: {
      position: 'relative',
      zIndex: 1,

      borderBottom: 'none'
    },

    preview: (0, _extends3.default)({
      padding: _styles.padding.normal,

      fontSize: _styles.font.size.form

    }, _styles.utils.border('1px', 'solid', theme.color.mono.lighter)),

    description: {
      marginBottom: _styles.padding.xsmall
    },

    textarea: {
      width: '100%',

      minHeight: 100,

      verticalAlign: 'top'
    }
  };
});

exports.default = styled(MarkdownInput);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/MarkdownInput.js