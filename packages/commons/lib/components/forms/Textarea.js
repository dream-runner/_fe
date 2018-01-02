'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _recompose = require('recompose');

var _reactForms = require('@signavio/react-forms');

var _styles = require('../../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (theme) {
  return (0, _extends3.default)({}, _styles.utils.input(theme), {

    display: 'block',

    resize: 'vertical',

    width: '100%'
  });
}, function (_ref) {
  var readOnly = _ref.readOnly;
  return { '&readOnly': readOnly };
}))(_reactForms.Textarea);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/Textarea.js