'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = LicensePurchasedEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _components = require('../components');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LicensePurchasedEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var number = event.number,
      purchaseOrderId = event.purchaseOrderId,
      licenseType = event.licenseType;


  return _react2.default.createElement(_workflowEvents2.default, (0, _extends3.default)({}, rest, {
    event: event,
    title: (0, _signavioI18n2.default)('purchased __link__ license.', 'purchased __link__ licenses.', {
      markdown: true,
      count: number,
      link: _react2.default.createElement(
        _components.PurchaseLink,
        { orderId: purchaseOrderId },
        number + ' ' + (0, _utils.findLicenseNameByType)(licenseType)
      )
    })
  }));
}


// WEBPACK FOOTER //
// ./packages/admin/lib/events/license/Purchased.js