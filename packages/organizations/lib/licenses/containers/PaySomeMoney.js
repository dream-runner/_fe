'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PaySomeMoney;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Purchase = require('./Purchase');

var _Purchase2 = _interopRequireDefault(_Purchase);

var _LicenseOverview = require('./LicenseOverview');

var _LicenseOverview2 = _interopRequireDefault(_LicenseOverview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PaySomeMoney(_ref) {
  var licenseType = _ref.licenseType;

  return _react2.default.createElement(
    'div',
    { className: 'view' },
    licenseType ? _react2.default.createElement(
      'div',
      { className: 'view-content' },
      _react2.default.createElement(_Purchase2.default, { license: licenseType })
    ) : _react2.default.createElement(_LicenseOverview2.default, null)
  );
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/containers/PaySomeMoney.js