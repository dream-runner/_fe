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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _utils = require('../utils');

var _styles = require('../styles');

var _PopoverOld = require('./PopoverOld');

var _PopoverOld2 = _interopRequireDefault(_PopoverOld);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _UserGuideLink = require('./UserGuideLink');

var _UserGuideLink2 = _interopRequireDefault(_UserGuideLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContextHelp = function (_Component) {
  (0, _inherits3.default)(ContextHelp, _Component);

  function ContextHelp() {
    (0, _classCallCheck3.default)(this, ContextHelp);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  ContextHelp.prototype.render = function render() {
    var _props = this.props,
        error = _props.error,
        block = _props.block,
        chapter = _props.chapter,
        className = _props.className,
        style = _props.style,
        rest = (0, _objectWithoutProperties3.default)(_props, ['error', 'block', 'chapter', 'className', 'style']);


    var triggerCls = _utils.CSSUtils.cls({
      'context-help': true,
      'context-help-block': block,
      'context-error': error,
      linked: chapter
    }, className);

    var popoverCls = _utils.CSSUtils.cls({
      'context-help-popover': true,
      linked: chapter
    });

    return _react2.default.createElement(
      'div',
      { style: { display: 'inline-block' } },
      _react2.default.createElement(
        _PopoverOld2.default,
        (0, _extends3.default)({}, this.props, style, {
          className: popoverCls,
          showDelay: 50,
          popover: this.renderPopover()
        }),
        _react2.default.createElement(
          'div',
          { className: triggerCls },
          this.renderLink()
        )
      )
    );
  };

  ContextHelp.prototype.renderLink = function renderLink() {
    var _props2 = this.props,
        chapter = _props2.chapter,
        section = _props2.section;


    if (!chapter) {
      return this.renderIcon();
    }

    return _react2.default.createElement(
      _UserGuideLink2.default,
      { chapter: chapter, section: section },
      this.renderIcon()
    );
  };

  ContextHelp.prototype.renderIcon = function renderIcon() {
    var error = this.props.error;


    return _react2.default.createElement(_Icon2.default, {
      inline: true,
      icon: error ? 'warning' : 'question',
      style: {
        width: '100%',
        height: '100%',
        fontSize: _styles.font.size.small,
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: 0,
        marginRight: 0
      }
    });
  };

  ContextHelp.prototype.renderPopover = function renderPopover() {
    return _react2.default.createElement(
      'div',
      { className: 'context-help-content' },
      this.props.children,
      this.props.chapter && this.renderUserGuideLink()
    );
  };

  ContextHelp.prototype.renderUserGuideLink = function renderUserGuideLink() {
    return _react2.default.createElement(
      'div',
      { className: 'context-help-footer' },
      (0, _signavioI18n2.default)('Click the question mark to open the user guide for more detailed information.')
    );
  };

  return ContextHelp;
}(_react.Component);

ContextHelp.defaultProps = {
  trigger: 'hover'
};
ContextHelp.propTypes = {
  chapter: _propTypes2.default.string,
  section: _propTypes2.default.string,
  className: _propTypes2.default.string,

  error: _propTypes2.default.bool,
  block: _propTypes2.default.bool,

  children: _propTypes2.default.node
};
exports.default = ContextHelp;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ContextHelp.js