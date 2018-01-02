'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoValue = exports.Show = exports.Edit = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _Edit2 = require('./Edit');

var _Edit3 = _interopRequireDefault(_Edit2);

var _Show2 = require('./Show');

var _Show3 = _interopRequireDefault(_Show2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Edit = _Edit3.default;
exports.Show = _Show3.default;
var NoValue = exports.NoValue = function NoValue() {
  return _react2.default.createElement(
    'span',
    null,
    (0, _signavioI18n2.default)('No items set')
  );
};


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/list/index.js