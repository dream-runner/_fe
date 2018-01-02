'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoValue = function NoValue() {
  return _react2.default.createElement(
    'span',
    null,
    (0, _signavioI18n2.default)('No workflow set')
  );
};

exports.default = NoValue;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/workflowId/NoValue.js