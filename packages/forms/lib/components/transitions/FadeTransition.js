'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FadeTransition;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Transition = require('react-transition-group/Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _FadeComponent = require('./FadeComponent');

var _FadeComponent2 = _interopRequireDefault(_FadeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var duration = 300;
function FadeTransition(_ref) {
  var children = _ref.children,
      required = _ref.required,
      visible = _ref.visible;

  return _react2.default.createElement(
    _Transition2.default,
    { 'in': visible, timeout: duration },
    function (state) {
      return _react2.default.createElement(
        _FadeComponent2.default,
        { required: required, state: state },
        children
      );
    }
  );
}


// WEBPACK FOOTER //
// ./packages/forms/lib/components/transitions/FadeTransition.js