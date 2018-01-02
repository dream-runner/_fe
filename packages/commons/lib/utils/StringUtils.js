'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = exports.urlOrEmailRegex = exports.protocols = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.removeWhitespaces = removeWhitespaces;
exports.validateUrl = validateUrl;
exports.validateUrlRelaxed = validateUrlRelaxed;
exports.getHost = getHost;
exports.validateEmail = validateEmail;
exports.isEmail = isEmail;
exports.isEmailHref = isEmailHref;
exports.parseMentions = parseMentions;
exports.newlinesToBrs = newlinesToBrs;
exports.camelize = camelize;
exports.decamelize = decamelize;
exports.keyify = keyify;
exports.capitalize = capitalize;
exports.capitalizeFirst = capitalizeFirst;
exports.preview = preview;
exports.randomString = randomString;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var protocols = exports.protocols = 'https?|file|ftp';

var urlOrEmailRegex = exports.urlOrEmailRegex = '(' + '(' + // brackets covering match for protocol (optional) and domain
'([A-Za-z]{3,9}:(?:\\/\\/)?)' + // match protocol
'(?:[\\-;:&=\\+\\$,w]+@)?' + // allow something@ for email addresses
'[A-Za-z0-9\\.\\-]+' + // anything looking at all like a domain, non-unicode domains
'(:[0-9]+)?' + // port number
'|' + // or instead of above
'(?:www.|[\\-;:&=\\+\\$,\\w]+@)' + // starting with something@ or www.
'[A-Za-z0-9\\.\\-]+' + // anything looking at all like a domain
'(:[0-9]+)?' + // port number
')' + '(' + // brackets covering match for path, query string and anchor
'(?:\\/[\\+~%\\/\\.\\w\\-]*)' + // allow optional /path
'?\\??(?:[\\-\\+=&;%@\\.\\w]*)' + // allow optional query string starting with ?
'#?(?:[\\-\\.\\!·/\\\\\\w]*)' + // allow optional anchor #anchor
')?' + // make URL suffix optional
')';

var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i; // http://snipplr.com/view/19594/

var checkOnInputSupport = function checkOnInputSupport(element) {
  var support = 'oninput' in element;

  if (support) {
    return true;
  }

  element.setAttribute('oninput', 'return;');
  support = typeof element.oninput === 'function';

  if (support) {
    return true;
  }

  try {
    var e = document.createEvent('KeyboardEvent');

    e.initKeyEvent('keypress', true, true, window, false, false, false, false, 0, 'e'.charCodeAt(0));
    document.body.appendChild(element);

    element.addEventListener('input', function (e) {
      support = true;

      e.preventDefault();
      e.stopPropagation();
    }, false);

    element.focus();
    element.dispatchEvent(e);

    document.body.removeChild(element);
  } catch (e) {}

  return support;
};

var events = exports.events = {
  oninput: function () {
    return checkOnInputSupport(document.createElement('input'));
  }(),

  oninputpre: function () {
    var pre = document.createElement('pre');
    pre.setAttribute('contentEditable', 'true');

    return checkOnInputSupport(pre);
  }()
};

function removeWhitespaces(str) {
  return _jquery2.default.trim(str).replace(/>\s*</g, '><');
}

// returns the, potentially corrected, URL str is a valid URL starting with a protocol part or www.
// otherwise returns false
function validateUrl(str) {
  if (!(0, _isString2.default)(str)) {
    return false;
  }

  var isUrl = new RegExp(urlOrEmailRegex, 'ig').test(str) && !validateEmail(str);
  if (!isUrl) {
    return false;
  }

  if (!str.match('^((' + protocols + '):)?\\/\\/')) {
    if (str.indexOf('www.') === 0) {
      // prepend http:// as the default protocol
      return 'http://' + str;
    }

    // no match if scheme part is omitted and URL does not start with www.
    return false;
  }

  return str;
}

function validateUrlRelaxed(str) {
  str = str.trim();
  if (!str.match('^((' + protocols + '):)?\\/\\/')) {
    // prepend http:// as the default protocol
    return 'http://' + str;
  }

  return str;

  return false;
}

/**
 * Returns the host of the given url (similar to window.location.host).
 * The protocol and path are stripped, but the port is still included.
 *
 * http://foo.bar:42/do/something => foo.bar:42
 */
function getHost() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  url = url.replace(new RegExp('^((' + protocols + '):)?\\/\\/'), '');
  return url.split('/')[0];
}

function validateEmail(email) {
  if (!(0, _isString2.default)(email)) {
    return false;
  }

  return emailRegex.test(email);
}

function isEmail(email) {
  return validateEmail(email);
}

function isEmailHref() {
  var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  email = email.replace(new RegExp('^mailto:'), '');
  return validateEmail(email);
}

/**
 * Replace all URLs and email addresses with HTML a tags skipping text sections inside of HTML elements
 */
// export function linkUrls(str){
//     var result = "";

//     $("<div>" + str + "</div>").contents().each(function() {
//         if(this.nodeType === 3) {
//             // if it is a text node
//             result += linkUrlsSimple($(this).text(), true);
//         } else {
//             // if it is a non text node
//             result += $("<div/>").append($(this).clone()).html();
//         }
//     });
//     return result;
// };

function parseMentions(str) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return str.replace(/(@\[(.*?)\]\((invitee|user|shortcut|email)\:.*?\))/gi, function (match, complete, text) {
    return _server2.default.renderToStaticMarkup(_react2.default.createElement(
      'span',
      { style: (0, _extends3.default)({}, props.style) },
      text
    ));
  });
}

function newlinesToBrs(str) {
  return str.replace(/\n/g, '<br>\n');
}

// export function replaceOuterParagraph(str) {
//     if ((str.match(/^<p>/g)||[]).length === 1){
//         return str.replace(/^<p>(.*)<\/p>\s*$/, '$1');
//     }
//     return str;
// };

// export function prepareForOutput(str) {
//     return unescapeCodeBlocks(  // marked will still escape content of code blocks, so we need to fix the double escaping
//         marked(                             // sanitize must be turned off to not escape the mentions and auto-links markup
//             linkUrls(
//                 parseMentions(
//                     escape(str)
//                 ),
//                 true
//             )
//         )
//     );
// };

function camelize(str) {
  return str.replace(/(\-|_|\.|\s)+(.)?/g, function (match, separator, chr) {
    return chr ? chr.toUpperCase() : '';
  }).replace(/^([A-Z])/, function (match) {
    return match.toLowerCase();
  });
}

function decamelize(str) {
  return str.replace(/[A-Z]/g, function (match) {
    return ' ' + match.toLowerCase();
  }).trim();
}

function keyify(str) {
  var usedKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var key = camelize(str.replace(/([^\w\s])/g, ' ')).trim();
  if (key.length === 0) {
    key = (0, _signavioI18n2.default)('unnamed');
  }
  if (/^\d.*/.test(key)) {
    // key must not start with a digit
    key = 'f' + key; // simply prepend a 'f'
  }

  if (!usedKeys) usedKeys = [];
  if ((0, _includes2.default)(usedKeys, key)) {
    var index = 2;
    while ((0, _includes2.default)(usedKeys, key + index)) {
      index++;
    }
    return key + index;
  }

  return key;
}

function capitalize(str) {
  return str.replace(/(^| )(\w)/g, function (x) {
    return x.toUpperCase();
  });
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function preview(str, numberOfChars) {
  var result = str.trim();
  if (result.indexOf('\n') > 0) {
    result = result.substring(0, result.indexOf('\n'));
  }
  if (result.length > numberOfChars) {
    var i = result.lastIndexOf(' ', numberOfChars);
    if (i > 0) {
      result = result.substring(0, i);
    } else {
      result = result.substring(0, numberOfChars);
    }
  }
  return result;
}

/**
* Returns a string with at least 64-bits of randomness, e.g. sn1s7vb4gcic.
*
* Doesn't trust Javascript's random function entirely. Uses a combination of
* random and current timestamp, and then encodes the string in base-36 to
* make it shorter.
*/
function randomString() {
  var x = 2147483648;
  var timestamp = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ timestamp).toString(36);
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/StringUtils.js