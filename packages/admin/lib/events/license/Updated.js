'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = LicensesUpdatedEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LicensesUpdatedEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var user = event.user,
      licenseType = event.licenseType,
      licenseId = event.licenseId;


  return _react2.default.createElement(_workflowEvents2.default, (0, _extends3.default)({}, rest, {
    event: event,
    title: event ? (0, _signavioI18n2.default)('changed __license__', {
      license: _react2.default.createElement(_components.LicenseLink, { licenseId: licenseId, licenseType: licenseType })
    }) : (0, _signavioI18n2.default)('changed __license__ of __user__', {
      license: _react2.default.createElement(_components.LicenseLink, { licenseId: licenseId, licenseType: licenseType }),
      user: _react2.default.createElement(_components.UserLink, { user: user })
    })
  }));
}


// WEBPACK FOOTER //
// ./packages/admin/lib/events/license/Updated.js