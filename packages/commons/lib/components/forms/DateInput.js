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

var _signavioI18n = require('signavio-i18n');

var _reactForms = require('@signavio/react-forms');

var _styles = require('../../styles');

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _higherOrder = require('./higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DateInput(_ref) {
  var locale = _ref.locale,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['locale']);

  return _react2.default.createElement(_reactForms.Date, (0, _extends3.default)({}, rest, { culture: locale || (0, _signavioI18n.locale)() }));
}


var EnhancedDatePicker = (0, _higherOrder.convertDate)(_DatePicker2.default);
var EnhancedDateInput = (0, _recompose.compose)(_higherOrder.convertDate, (0, _styles.defaultStyle)({
  width: '100%'
}))(DateInput);

exports.default = (0, _reactForms.stickWidgetToInput)(EnhancedDatePicker, EnhancedDateInput);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/DateInput.js