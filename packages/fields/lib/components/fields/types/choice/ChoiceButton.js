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

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ChoiceButton(_ref) {
  var isPrimary = _ref.isPrimary,
      readOnly = _ref.readOnly,
      option = _ref.option,
      onClick = _ref.onClick,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['isPrimary', 'readOnly', 'option', 'onClick']);

  return _react2.default.createElement(
    _buttons.TextButton,
    (0, _extends3.default)({}, rest, {
      block: true,
      primary: isPrimary,
      disabled: readOnly,
      title: option.value,
      onClick: onClick
    }),
    option.name ? option.name : _react2.default.createElement(
      _hints.Hint,
      { style: rest.style('hint'), inline: true },
      (0, _signavioI18n2.default)('Unnamed')
    )
  );
}

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onClick: function onClick(_ref2) {
    var option = _ref2.option,
        readOnly = _ref2.readOnly,
        onChange = _ref2.onChange;
    return function () {
      if (readOnly) {
        return;
      }

      if (!onChange) {
        console.error("You rendered this choice as buttons but didn't specify an onChange handler!");
      }

      onChange(option.id);
    };
  }
}), (0, _styles.defaultStyle)(function (theme) {
  return {
    '&unnamed': {
      hint: {
        color: _styles.utils.color(theme.color.mono.light)
      }
    },
    '&unnamed-primary': {
      hint: {
        color: _styles.utils.color(theme.color.secondary.base)
      }
    }
  };
}, function (_ref3) {
  var option = _ref3.option,
      isPrimary = _ref3.isPrimary;
  return {
    '&unnamed': !option.name,
    '&unnamed-primary': !option.name && isPrimary
  };
}))(ChoiceButton);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/choice/ChoiceButton.js