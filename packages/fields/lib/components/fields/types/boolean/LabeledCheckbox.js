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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LabeledCheckbox(_ref) {
  var indeterminate = _ref.indeterminate,
      label = _ref.label,
      readOnly = _ref.readOnly,
      value = _ref.value,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['indeterminate', 'label', 'readOnly', 'value', 'style']);

  return _react2.default.createElement(
    'label',
    (0, _extends3.default)({}, rest, style),
    _react2.default.createElement('input', (0, _extends3.default)({}, style('input'), {
      type: 'checkbox',
      disabled: readOnly,
      checked: value,
      ref: function ref(el) {
        if (el) {
          // https://github.com/facebook/react/issues/1798
          el.indeterminate = indeterminate;
        }
      }
    })),
    _react2.default.createElement(
      'div',
      style('label'),
      label || (0, _signavioI18n2.default)('Unnamed')
    )
  );
} // flow


var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    paddingLeft: theme.padding.normal,
    paddingTop: theme.padding.xsmall,
    paddingBottom: theme.padding.xsmall,

    input: {
      float: 'left',

      marginRight: 0,
      marginTop: 5
    },

    label: {
      marginLeft: theme.padding.normal + theme.padding.xsmall
    },

    '&readOnly': {
      label: {
        color: theme.color.mono.middle
      }
    }
  };
}, function (_ref2) {
  var readOnly = _ref2.readOnly;
  return {
    '&readOnly': readOnly
  };
});

exports.default = styled(LabeledCheckbox);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/boolean/LabeledCheckbox.js