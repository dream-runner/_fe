'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reactForms = require('@signavio/react-forms');

var _ui = require('@signavio/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _ui.defaultStyle)(function (theme) {
  return (0, _extends3.default)({}, _ui.styles.input(theme), {

    width: '100%'
  });
})(_reactForms.Text);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/Text.js