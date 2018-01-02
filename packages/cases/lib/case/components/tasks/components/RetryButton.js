'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RetryButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RetryButton(_ref) {
  var readOnly = _ref.readOnly,
      onRetry = _ref.onRetry;

  return _react2.default.createElement(
    _components.Popover,
    { popover: (0, _signavioI18n2.default)('Retry to execute this action again'), small: true },
    _react2.default.createElement(_components.Remove, { readOnly: readOnly, icon: 'reload', onRemove: onRetry })
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/tasks/components/RetryButton.js