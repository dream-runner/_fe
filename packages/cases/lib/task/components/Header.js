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

var _headers = require('@signavio/effektif-commons/lib/components/headers');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var readOnly = _ref.readOnly,
      style = _ref.style,
      task = _ref.task,
      onNameChange = _ref.onNameChange;
  return _react2.default.createElement(_headers.PrimaryHeader, {
    light: true,
    style: style,
    readOnly: readOnly,
    value: task.name,
    onBlur: onNameChange,
    placeholder: (0, _signavioI18n2.default)('What is specific for this task?')
  });
};
exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onNameChange: function onNameChange(_ref2) {
    var task = _ref2.task,
        readOnly = _ref2.readOnly,
        onChange = _ref2.onChange;
    return function (_ref3) {
      var target = _ref3.target;

      if (readOnly) {
        return;
      }

      onChange((0, _extends3.default)({}, task, {
        name: target.value
      }));
    };
  }
}), (0, _styles.defaultStyle)(function (_ref4) {
  var padding = _ref4.padding,
      font = _ref4.font;
  return {
    paddingTop: 0
  };
}))(Header);


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/Header.js