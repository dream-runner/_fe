'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CreateReport;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CreateReport(_ref) {
  var onCreate = _ref.onCreate,
      disabled = _ref.disabled;

  return _react2.default.createElement(
    'div',
    { className: 'view configuration' },
    _react2.default.createElement(
      'div',
      { className: 'view-header' },
      _react2.default.createElement(_Header2.default, { onCreate: onCreate, autoFocus: true, disabled: disabled })
    )
  );
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/CreateReport.js