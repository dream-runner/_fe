'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapWithErrorBoundary = function wrapWithErrorBoundary(WrappedComponent) {
  return function (props) {
    return _react2.default.createElement(
      _components.ErrorBoundary,
      { asTile: true, small: props.small, transparent: props.transparent },
      _react2.default.createElement(WrappedComponent, props)
    );
  };
};

exports.default = wrapWithErrorBoundary;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/higher-order/wrapWithErrorBoundary.js