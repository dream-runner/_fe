'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = TimeInput;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _reactForms = require('@signavio/react-forms');

var _utils = require('./utils');

var _extensions = require('../../extensions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TimeInput(_ref) {
  var value = _ref.value,
      locale = _ref.locale,
      onChange = _ref.onChange,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['value', 'locale', 'onChange']);

  return _react2.default.createElement(_reactForms.Time, (0, _extends3.default)({}, rest, {
    culture: locale || (0, _signavioI18n.locale)(),
    value: (0, _utils.formatDateOrTime)(value, 'HH:mm'),
    onChange: function (_onChange) {
      function onChange(_x) {
        return _onChange.apply(this, arguments);
      }

      onChange.toString = function () {
        return _onChange.toString();
      };

      return onChange;
    }(function (time) {
      var _time$split = time.split(':'),
          _time$split2 = (0, _slicedToArray3.default)(_time$split, 2),
          hour = _time$split2[0],
          minute = _time$split2[1];

      var datePart = _extensions.moment.utc().format('Y-MM-DD');

      onChange(datePart + 'T' + hour + ':' + minute + ':00.000Z');
    })
  }));
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/TimeInput.js