'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DueDateSelect(_ref) {
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
            style('toggle'),
            (0, _extensions.moment)(value).format('LLL'),
            !readOnly && _react2.default.createElement(_components.Icon, {
              small: true,
              iconSet: 'fontAwesome',
              icon: open ? 'angle-up' : 'angle-down'
            })
          );
        }

        return _react2.default.createElement(
          'span',
          style('toggle'),
          _react2.default.createElement(
            _hints.Hint,
            { inline: true },
            (0, _signavioI18n2.default)('Not set')
          ),
          !readOnly && _react2.default.createElement(_components.Icon, {
            small: true,
            iconSet: 'fontAwesome',
            icon: open ? 'angle-up' : 'angle-down'
          })
        );
      }
    },
    _react2.default.createElement(_components.DueDate, { value: value, onChange: onChange })
  );
}

var styled = (0, _styles.defaultStyle)({
  toggle: {
    cursor: 'pointer'
  },

  '&readOnly': {
    toggle: {
      cursor: null
    }
  }
}, function (_ref2) {
  var readOnly = _ref2.readOnly;
  return {
    '&readOnly': readOnly
  };
});

exports.default = styled(DueDateSelect);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/DueDateSelect.js