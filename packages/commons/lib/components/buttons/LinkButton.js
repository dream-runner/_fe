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

var _reactRouterDom = require('react-router-dom');

var _ui = require('@signavio/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkButton = function LinkButton(_ref) {
  var to = _ref.to,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['to']);

  if (!to) {
    return _react2.default.createElement(_ui.LinkButton, rest);
  }

  return _react2.default.createElement(_ui.LinkButton, (0, _extends3.default)({ component: _reactRouterDom.Link, to: to }, rest));
};

exports.default = LinkButton;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/buttons/LinkButton.js