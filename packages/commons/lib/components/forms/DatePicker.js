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

var _reactForms = require('@signavio/react-forms');

var _higherOrder = require('../higher-order');

var _styles = require('../../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePickerComponent = function DatePickerComponent(_ref) {
  var style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['style']);
  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(_reactForms.DatePicker, (0, _extends3.default)({}, rest, { style: style('picker') }))
  );
};
exports.default = (0, _recompose.compose)((0, _recompose.mapProps)(function (props) {
  return (0, _extends3.default)({
    enableOutsideDays: true
  }, props);
}), (0, _recompose.withHandlers)({
  onChange: function (_onChange) {
    function onChange(_x) {
      return _onChange.apply(this, arguments);
    }

    onChange.toString = function () {
      return _onChange.toString();
    };

    return onChange;
  }(function (_ref2) {
    var onBlur = _ref2.onBlur,
        onChange = _ref2.onChange;
    return function (date) {
      onChange(date);

      if (onBlur) {
        onBlur();
      }
    };
  })
}), (0, _styles.defaultStyle)(function (_ref3) {
  var color = _ref3.color,
      font = _ref3.font,
      lineHeight = _ref3.lineHeight,
      padding = _ref3.padding;

  var dayTotalHeight = _styles.utils.calculateHeight(font.size.normal, lineHeight, padding.small);

  return (0, _extends3.default)({
    backgroundColor: 'white',
    padding: padding.xsmall

  }, _styles.utils.border('1px', 'solid', color.mono.lighter), _styles.utils.boxShadow(), {

    picker: {
      outline: 'none',

      caption: {
        paddingTop: padding.xsmall,
        height: lineHeight
      },

      'nav-bar': {
        top: padding.xsmall
      },

      'nav-button': {
        height: lineHeight / 2
      },

      navigation: {
        month: {
          backgroundColor: 'white',
          fontSize: font.size.normal
        },
        year: {
          backgroundColor: 'white',
          fontSize: font.size.normal
        }
      },

      weekdays: (0, _extends3.default)({}, _styles.utils.borderTop(1, 'solid', color.mono.light)),

      weekday: {
        color: color.mono.ultradark,
        fontWeight: 'bold',
        height: dayTotalHeight,
        lineHeight: lineHeight + 'px',
        padding: null,
        fontSize: null
      },

      month: {
        backgroundColor: 'white'
      },

      day: {
        padding: null,
        outline: 'none',
        border: 'none',
        minWidth: dayTotalHeight,
        height: dayTotalHeight,
        lineHeight: lineHeight + 'px',

        '&today': {
          backgroundColor: color.primary.light,
          color: _styles.utils.color(color.primary.light)
        },

        '&selected': {
          backgroundColor: color.primary.base,
          color: _styles.utils.color(color.primary.base)
        }
      }
    }
  });
}), (0, _higherOrder.omitProps)(['onComplete']))(DatePickerComponent);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/forms/DatePicker.js