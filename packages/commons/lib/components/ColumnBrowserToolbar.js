'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColumnBrowserToolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ui = require('@signavio/ui');

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ColumnBrowserToolbar(props) {
  var small = props.small;


  if (props.loading) {
    return _react2.default.createElement(_ui.Spinner, { small: small });
  }

  return _react2.default.createElement(_Icon2.default, { small: small, iconSet: 'fontAwesome', icon: 'angle-right' });
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ColumnBrowserToolbar.js