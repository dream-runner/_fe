'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Section() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var children = props.children,
      title = props.title,
      rest = (0, _objectWithoutProperties3.default)(props, ['children', 'title']);


  return _react2.default.createElement(
    'div',
    rest,
    _react2.default.createElement(
      'h3',
      { className: 'container-header' },
      title
    ),
    children
  );
}

Section.propTypes = {
  title: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node
};

exports.default = (0, _radium2.default)(Section);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Section.js