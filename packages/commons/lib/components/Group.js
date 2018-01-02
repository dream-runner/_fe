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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('../styles');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Group() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var style = props.style,
      narrow = props.narrow,
      title = props.title,
      children = props.children,
      rest = (0, _objectWithoutProperties3.default)(props, ['style', 'narrow', 'title', 'children']);


  var cls = _utils.CSSUtils.cls({
    group: true,
    'group-narrow': narrow
  }, style.className);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, style(props), { className: cls }),
    _react2.default.createElement(
      'h4',
      (0, _extends3.default)({}, style('title'), {
        className: style('title').className + ' container-header'
      }),
      title
    ),
    children
  );
}

var styled = (0, _styles.defaultStyle)({}, function (props) {
  return {
    '&narrow': props.narrow
  };
});

exports.default = styled(Group);


Group.defaultProps = {
  className: 'group'
};

Group.propTypes = {
  title: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  narrow: _propTypes2.default.bool
};


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Group.js