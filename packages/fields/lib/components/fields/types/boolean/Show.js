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

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _LabeledCheckbox = require('./LabeledCheckbox');

var _LabeledCheckbox2 = _interopRequireDefault(_LabeledCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Show(_ref) {
  var value = _ref.value,
      label = _ref.label,
      regularBoolean = _ref.regularBoolean,
      transparent = _ref.transparent,
      small = _ref.small,
      indeterminate = _ref.indeterminate,
      style = _ref.style;

  if (regularBoolean) {
    return _react2.default.createElement(_LabeledCheckbox2.default, {
      indeterminate: indeterminate,
      style: style,
      readOnly: true,
      label: label,
      value: value
    });
  }

  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({ transparent: transparent, small: small }, { style: style }),
    value ? (0, _signavioI18n2.default)('Yes') : (0, _signavioI18n2.default)('No')
  );
}


var enhance = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color,
      font = _ref2.font;
  return {
    '&triState': {
      textTransform: 'uppercase',
      fontSize: font.size.form,
      color: color.mono.middle
    },

    '&yes': {
      status: {
        fontWeight: 'bold'
      }
    }
  };
}, function (_ref3) {
  var value = _ref3.value,
      regularBoolean = _ref3.regularBoolean;
  return {
    '&yes': value === true,
    '&no': value === false,

    '&triState': !regularBoolean
  };
});

exports.default = enhance(Show);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/boolean/Show.js