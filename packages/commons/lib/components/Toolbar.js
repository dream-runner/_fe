"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Toolbar;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Toolbar(_ref) {
  var left = _ref.left,
      children = _ref.children,
      right = _ref.right;

  return _react2.default.createElement(
    "div",
    { className: "toolbar" },
    left && _react2.default.createElement(
      "div",
      { className: "toolbar-content pull-left" },
      left
    ),
    children,
    right && _react2.default.createElement(
      "div",
      { className: "toolbar-content pull-right" },
      right
    )
  );
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Toolbar.js