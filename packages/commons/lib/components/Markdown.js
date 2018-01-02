'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.markdown = markdown;
exports.unsafeMarkdown = unsafeMarkdown;
exports.escape = escape;
exports.unescapeCodeBlocks = unescapeCodeBlocks;
exports.linkUrls = linkUrls;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _lodash = require('lodash');

var _styles = require('../styles');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Markdown(_ref) {
  var children = _ref.children,
      unsafe = _ref.unsafe,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'unsafe', 'style']);

  var html = '';

  if (children) {
    if (unsafe) {
      html = unsafeMarkdown(children.toString());
    } else {
      html = markdown(children.toString());
    }
  }

  return _react2.default.createElement('div', (0, _extends3.default)({}, rest, style, {
    className: 'markdown-content',
    dangerouslySetInnerHTML: { __html: html }
  }));
}

exports.default = (0, _styles.defaultStyle)()(Markdown);


var renderer = new _marked2.default.Renderer();

renderer.blockquote = function (text) {
  return _server2.default.renderToStaticMarkup(_react2.default.createElement('blockquote', {
    style: {
      paddingLeft: _styles.padding.normal,
      paddingRight: _styles.padding.normal,
      paddingTop: _styles.padding.xsmall,
      paddingBottom: _styles.padding.xsmall,

      marginBottom: _styles.padding.normal,

      fontSize: _styles.font.size.form
    },
    dangerouslySetInnerHTML: { __html: text }
  }));
};

// extended the original implementation to support
// external links to other sites in a new tab
renderer.link = function (href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent((0, _lodash.unescape)(href)).replace(/[^\w:]/g, '').toLowerCase();

      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
        return '';
      }
    } catch (e) {
      return '';
    }
  }

  var isSameOrigin = _utils.StringUtils.isEmailHref(href) || window.location.host === _utils.StringUtils.getHost(href);

  return _server2.default.renderToStaticMarkup(_react2.default.createElement(
    'a',
    { href: href, title: title, target: isSameOrigin ? null : '_blank' },
    text
  ));
};

renderer.tablecell = function (content, _ref2) {
  var header = _ref2.header,
      align = _ref2.align;
  return _server2.default.renderToStaticMarkup(_react2.default.createElement('td', {
    style: (0, _extends3.default)({
      padding: _styles.padding.xsmall,

      fontWeight: header ? 'bold' : 'normal',
      verticalAlign: header ? 'bottom' : 'top',
      align: align

    }, _styles.utils.borderBottom(header ? 2 : 1, 'solid', 'rgb(229, 229, 229)')),
    dangerouslySetInnerHTML: { __html: content }
  }));
};

renderer.table = function (header, body) {
  return _server2.default.renderToStaticMarkup(_react2.default.createElement(
    'table',
    {
      style: {
        width: '100%',
        maxWidth: '100%',

        marginBottom: _styles.padding.normal
      }
    },
    _react2.default.createElement('thead', { dangerouslySetInnerHTML: { __html: header } }),
    _react2.default.createElement('tbody', { dangerouslySetInnerHTML: { __html: body } })
  ));
};

renderer.image = function (href, title, text) {
  return _server2.default.renderToStaticMarkup(_react2.default.createElement(
    'a',
    { href: href, target: '_blank' },
    _react2.default.createElement('img', { src: href, title: title })
  ));
};

_marked2.default.setOptions({
  renderer: renderer,

  gfm: true,
  tables: true,
  pedantic: false,
  smartLists: true,
  smartypants: true,
  breaks: true
});

function markdown(str) {
  return unescapeCodeBlocks((0, _marked2.default)(linkUrls(escape(str), true)));
}

// does not escape the string anymore
function unsafeMarkdown(str) {
  return unescapeCodeBlocks((0, _marked2.default)(linkUrls(str, true)));
}

function escape() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  str = (0, _lodash.escape)(str);
  return str.replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#96;/g, '`').replace(/&#39;/g, "'"); //
}

function unescapeCodeBlocks(str) {
  return str.replace(/<code>((.|\s)*?)<\/code>/g, function (match, content) {
    return '<code>' + (0, _lodash.unescape)(content) + '</code>';
  });
}

/**
 * Wrap all URLs and email addresses with HTML a tags
 * If skipMarkdownLinks is set true, links prefixed by something like "[link title](" are not replaced
 */
function linkUrls(str, skipMarkdownLinks) {
  var regex = new RegExp('(\\[[^\\]]+\\]\\()?' + _utils.StringUtils.urlOrEmailRegex, 'ig');

  return String(str).replace(regex, function (match, prefix, link) {
    if (skipMarkdownLinks && prefix) {
      return match; // no replacement
    }

    prefix = prefix || '';

    var getHostname = function getHostname(url) {
      var l = document.createElement('a');
      l.href = url;
      return l;
    };

    if (_utils.StringUtils.validateEmail(link)) {
      return prefix + '<a href="mailto:' + escape(link) + '">' + escape(link) + '</a>';
    }

    var href = _utils.StringUtils.validateUrl(link);
    if (!href) {
      return link; // no replacement
    }

    var isSameOrigin = getHostname(href) === window.location.host,
        text = link.replace(new RegExp('^((' + _utils.StringUtils.protocols + '):)?\\/\\/'), '');

    return prefix + '<a href="' + escape(href) + '" ' + (isSameOrigin ? '' : 'target="_blank" rel="noopener noreferrer"') + '>' + escape(text) + '</a>';
  });
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Markdown.js