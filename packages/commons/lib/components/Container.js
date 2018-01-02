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

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function Container(_ref) {
  var children = _ref.children,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children']);
  return _react2.default.createElement(
    'div',
    rest,
    children
  );
};

exports.default = (0, _recompose.mapProps)(function (_ref2) {
  var fullWidth = _ref2.fullWidth,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['fullWidth']);
  return (0, _extends3.default)({
    className: 'container' + (fullWidth ? '-fluid' : '')
  }, rest);
})(Container);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Container.js