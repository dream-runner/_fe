'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _priorities = require('./priorities');

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Select(_ref) {
  var readOnly = _ref.readOnly,
      onChange = _ref.onChange,
      value = _ref.value,
      style = _ref.style;

  return _react2.default.createElement(
    _components.DropDown,
    {
      readOnly: readOnly,
      toggle: _react2.default.createElement(
        _components.Popover,
        { popover: (0, _signavioI18n2.default)('Case priority') },
        value ? _react2.default.createElement(
          _buttons.TextButton,
          { style: style('priority-toggle'), disabled: readOnly },
          (0, _priorities.priorities)()[value].name
        ) : _react2.default.createElement(_buttons.IconButton, { icon: 'priority' })
      ),
      toggleIcon: null,
      closeOnClick: true,
      pushRight: true
    },
    _react2.default.createElement(_Options2.default, { value: value, onChange: onChange })
  );
}

var getModifiers = function getModifiers(_ref2) {
  var value = _ref2.value;

  if (value) {
    return (0, _defineProperty3.default)({}, '&priority-' + value, true);
  }
  return {};
};

var styled = (0, _styles.defaultStyle)(function () {
  return {
    '&priority-0': {
      'priority-toggle': {
        backgroundColor: _priorities.Colors.high,
        color: _styles.utils.color(_priorities.Colors.high),
        ':hover': {
          backgroundColor: (0, _color2.default)(_priorities.Colors.high).darken(0.05).string(),
          color: _styles.utils.color((0, _color2.default)(_priorities.Colors.high).darken(0.05).string())
        }
      }
    },
    '&priority-1': {
      'priority-toggle': {
        backgroundColor: _priorities.Colors.medium,
        color: _styles.utils.color(_priorities.Colors.medium),
        ':hover': {
          backgroundColor: (0, _color2.default)(_priorities.Colors.medium).darken(0.05).string(),
          color: _styles.utils.color((0, _color2.default)(_priorities.Colors.medium).darken(0.05).string())
        }
      }
    },
    '&priority-2': {
      'priority-toggle': {
        backgroundColor: _priorities.Colors.normal,
        color: _styles.utils.color(_priorities.Colors.normal),
        ':hover': {
          backgroundColor: (0, _color2.default)(_priorities.Colors.normal).darken(0.05).string(),
          color: _styles.utils.color((0, _color2.default)(_priorities.Colors.normal).darken(0.05).string())
        }
      }
    },
    '&priority-3': {
      'priority-toggle': {
        backgroundColor: _priorities.Colors.low,
        color: _styles.utils.color(_priorities.Colors.low),
        ':hover': {
          backgroundColor: (0, _color2.default)(_priorities.Colors.low).darken(0.05).string(),
          color: _styles.utils.color((0, _color2.default)(_priorities.Colors.low).darken(0.05).string())
        }
      }
    }
  };
}, getModifiers);

exports.default = styled(Select);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/priority/Select.js