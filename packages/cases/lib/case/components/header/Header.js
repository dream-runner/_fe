'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _headers = require('@signavio/effektif-commons/lib/components/headers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CaseHeader = function CaseHeader(_ref) {
  var value = _ref.value,
      style = _ref.style,
      readOnly = _ref.readOnly,
      onChange = _ref.onChange,
      onNameChange = _ref.onNameChange;

  return _react2.default.createElement(_headers.PrimaryHeader, {
    light: true,
    style: style,
    readOnly: readOnly,
    onBlur: onNameChange,
    placeholder: (0, _signavioI18n2.default)('What is the topic of this case?'),
    value: value
  });
};
exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onNameChange: function onNameChange(_ref2) {
    var caze = _ref2.caze,
        onChange = _ref2.onChange;
    return function (_ref3) {
      var target = _ref3.target;
      return onChange(target.value);
    };
  }
}), (0, _styles.defaultStyle)(function (_ref4) {
  var color = _ref4.color,
      padding = _ref4.padding;
  return {
    paddingTop: 0,

    '&closed': {
      value: (0, _extends3.default)({}, _styles.utils.borderBottom(2, 'solid', color.mono.lighter)),
      input: (0, _extends3.default)({}, _styles.utils.borderBottom(2, 'solid', color.mono.lighter))
    }
  };
}, function (_ref5) {
  var closed = _ref5.closed;
  return {
    '&closed': closed
  };
}))(CaseHeader);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/header/Header.js