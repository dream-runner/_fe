'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Conversions = function Conversions(_ref) {
  var canToggleList = _ref.canToggleList,
      isList = _ref.isList,
      onChange = _ref.onChange,
      readOnly = _ref.readOnly;

  if (readOnly) {
    return _react2.default.createElement(_effektifFields.Field, {
      label: (0, _signavioI18n2.default)('Allow entering multiple values'),
      type: { name: 'boolean' },
      value: isList,
      regularBoolean: true
    });
  }

  return _react2.default.createElement(_effektifFields.Field, {
    label: _react2.default.createElement(
      'div',
      null,
      (0, _signavioI18n2.default)('Allow entering multiple values'),
      !canToggleList && _react2.default.createElement(
        _components.ContextHelp,
        null,
        (0, _signavioI18n2.default)('You are already using this field in the process in a way which prevents the conversion into a list.')
      )
    ),
    onChange: onChange,
    readOnly: !canToggleList,
    regularBoolean: true,
    type: { name: 'boolean' },
    value: isList
  });
};

exports.default = Conversions;


// WEBPACK FOOTER //
// ./packages/forms/lib/components/Conversions.js