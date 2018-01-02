'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = UserGuideLink;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserGuideLink(props) {
  var _locale$split = (0, _signavioI18n.locale)().split('_'),
      _locale$split2 = (0, _slicedToArray3.default)(_locale$split, 1),
      lang = _locale$split2[0];

  var url = 'https://docs.signavio.com/userguide/workflow/' + lang + '/';

  var chapter = props.chapter,
      section = props.section,
      children = props.children,
      rest = (0, _objectWithoutProperties3.default)(props, ['chapter', 'section', 'children']);


  if (chapter) {
    url = '' + url + chapter + '.html';
  }

  if (section) {
    url = url + '#' + section;
  }

  return _react2.default.createElement(
    'a',
    (0, _extends3.default)({}, rest, { href: url, rel: 'external' }),
    children
  );
}

UserGuideLink.propTypes = {
  chapter: _propTypes2.default.string,
  section: _propTypes2.default.string,

  children: _propTypes2.default.node.isRequired
};


// WEBPACK FOOTER //
// ./packages/commons/lib/components/UserGuideLink.js