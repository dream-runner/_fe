'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _Options = require('../../../components/priority/Options');

var _Options2 = _interopRequireDefault(_Options);

var _priorities = require('../../../components/priority/priorities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PrioritySelect(_ref) {
  var value = _ref.value,
      style = _ref.style,
      readOnly = _ref.readOnly,
      onChange = _ref.onChange;

  return _react2.default.createElement(
    _components.DropDown,
    {
      hideToggleButton: true,
      disabled: readOnly,
      toggle: function toggle(open) {
        if (value) {
          return _react2.default.createElement(
            'span',
            style('value'),
            (0, _priorities.priorities)()[value].name,
            !readOnly && _react2.default.createElement(_components.Icon, {
              small: true,
              iconSet: 'fontAwesome',
              icon: open ? 'angle-up' : 'angle-down'
            })
          );
        }

        return _react2.default.createElement(
          'span',
          style('empty'),
          _react2.default.createElement(
            _hints.Hint,
            { inline: true },
            (0, _signavioI18n2.default)('Not set'),
            !readOnly && _react2.default.createElement(_components.Icon, {
              small: true,
              iconSet: 'fontAwesome',
              icon: open ? 'angle-up' : 'angle-down'
            })
          )
        );
      }
    },
    _react2.default.createElement(_Options2.default, { value: value, onChange: onChange })
  );
}


var colors = {
  '0': '#ea86a7',
  '1': '#ead586',
  '2': '#8eea86',
  '3': '#86e5ea'
};

var styled = (0, _styles.defaultStyle)(function (theme, _ref2) {
  var value = _ref2.value;
  return {
    value: (0, _extends3.default)({
      cursor: 'pointer'

    }, value && _styles.utils.borderBottom(2, 'solid', colors[value]), {

      paddingLeft: 2,
      paddingRight: 2
    }),

    empty: {
      cursor: 'pointer'
    },

    '&readOnly': {
      value: {
        cursor: null
      },

      empty: {
        cursor: null
      }
    }
  };
}, function (_ref3) {
  var readOnly = _ref3.readOnly;
  return {
    '&readOnly': readOnly
  };
});

exports.default = styled(PrioritySelect);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/header/PrioritySelect.js