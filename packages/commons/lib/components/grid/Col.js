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

var Col = function Col(_ref) {
  var verticalAlign = _ref.verticalAlign,
      className = _ref.className,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['verticalAlign', 'className']);
  return _react2.default.createElement(_reactBootstrap.Col, (0, _extends3.default)({}, rest, {
    className: (0, _classnames2.default)(className, (0, _defineProperty3.default)({}, 'col-vertical-align-' + verticalAlign, verticalAlign))
  }));
};

exports.default = Col;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/grid/Col.js