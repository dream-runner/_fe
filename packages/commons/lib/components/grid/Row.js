'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = function Row(_ref) {
  var noPadding = _ref.noPadding,
      equalHeights = _ref.equalHeights,
      className = _ref.className,
      verticalAlign = _ref.verticalAlign,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['noPadding', 'equalHeights', 'className', 'verticalAlign']);
  return _react2.default.createElement(_reactBootstrap.Row, (0, _extends3.default)({}, rest, {
    className: (0, _classnames2.default)(className, (0, _defineProperty3.default)({
      'row-no-padding': noPadding,
      'row-equal-heights': equalHeights
    }, 'row-vertical-align-' + verticalAlign, equalHeights && verticalAlign))
  }));
};

exports.default = Row;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/grid/Row.js