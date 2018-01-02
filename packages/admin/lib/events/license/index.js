'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.purchaseCompleted = exports.licensePurchased = exports.licenseProfileActivated = exports.licenseDeleted = exports.licenseUpdated = exports.licenseCreated = undefined;

var _Created = require('./Created');

var _Created2 = _interopRequireDefault(_Created);

var _Updated = require('./Updated');

var _Updated2 = _interopRequireDefault(_Updated);

var _Deleted = require('./Deleted');

var _Deleted2 = _interopRequireDefault(_Deleted);

var _ProfileActivated = require('./ProfileActivated');

var _ProfileActivated2 = _interopRequireDefault(_ProfileActivated);

var _Purchased = require('./Purchased');

var _Purchased2 = _interopRequireDefault(_Purchased);

var _PurchaseCompleted = require('./PurchaseCompleted');

var _PurchaseCompleted2 = _interopRequireDefault(_PurchaseCompleted);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.licenseCreated = _Created2.default;
exports.licenseUpdated = _Updated2.default;
exports.licenseDeleted = _Deleted2.default;
exports.licenseProfileActivated = _ProfileActivated2.default;
exports.licensePurchased = _Purchased2.default;
exports.purchaseCompleted = _PurchaseCompleted2.default;
exports.default = {
  licenseCreated: _Created2.default,
  licenseUpdated: _Updated2.default,
  licenseDeleted: _Deleted2.default,
  licenseProfileActivated: _ProfileActivated2.default,
  licensePurchased: _Purchased2.default,
  purchaseCompleted: _PurchaseCompleted2.default
};


// WEBPACK FOOTER //
// ./packages/admin/lib/events/license/index.js