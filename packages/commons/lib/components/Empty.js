'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Empty(props) {
  var children = props.children,
      style = props.style,
      rest = (0, _objectWithoutProperties3.default)(props, ['children', 'style']);

  return _react2.default.createElement(
    'span',
    (0, _extends3.default)({}, (0, _lodash.omit)(rest, 'block'), style),
    children
  );
}

var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    color: _styles.utils.textColor(theme.color.mono.light),
    fontStyle: 'italic',

    '&block': {
      display: 'block',
      paddingLeft: _styles.padding.normal,
      paddingRight: _styles.padding.normal
    }
  };
}, function (_ref) {
  var block = _ref.block;
  return {
    '&block': block
  };
});

exports.default = styled(Empty);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Empty.js