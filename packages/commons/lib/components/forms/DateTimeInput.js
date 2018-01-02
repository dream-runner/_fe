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

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _reactForms = require('@signavio/react-forms');

var _extensions = require('../../extensions');

var _styles = require('../../styles');

var _utils = require('./utils');

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _higherOrder = require('./higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DateTimeInput(_ref) {
  var value = _ref.value,
      locale = _ref.locale,
      onChange = _ref.onChange,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['value', 'locale', 'onChange']);

  return _react2.default.createElement(_reactForms.DateTimeLocal, (0, _extends3.default)({}, rest, {
    culture: locale || (0, _signavioI18n.locale)(),
    value: getValueWithoutTimezone(value),
    onChange: function (_onChange) {
      function onChange(_x) {
        return _onChange.apply(this, arguments);
      }

      onChange.toString = function () {
        return _onChange.toString();
      };

      return onChange;
    }(function (newValue) {
      if (!(0, _utils.validateDate)(newValue)) {
        return;
      }

      onChange(addTimezone(newValue));
    })
  }));
}

var getValueWithoutTimezone = function getValueWithoutTimezone(value) {
  var validatedDate = (0, _utils.validateDate)(value);

  if ((0, _lodash.isNil)(validatedDate)) {
    return null;
  }

  return validatedDate.format('Y-MM-DDTHH:mm:ss');
};

var addTimezone = function addTimezone(value) {
  return value && (0, _extensions.moment)(value).toISOString();
};

var EnhancedDatePicker = (0, _higherOrder.convertDateTime)(_DatePicker2.default);
var EnhancedDateInput = (0, _recompose.compose)((0, _styles.defaultStyle)({
  width: '100%'
}))(DateTimeInput);

exports.default = (0, _reactForms.stickWidgetToInput)(EnhancedDatePicker, EnhancedDateInput);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/DateTimeInput.js