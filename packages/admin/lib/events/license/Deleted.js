'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = LicenseDeletedEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _utils = require('../utils');

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LicenseDeletedEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var user = event.user,
      licenseType = event.licenseType;


  return _react2.default.createElement(_workflowEvents2.default, (0, _extends3.default)({}, rest, {
    event: event,
    title: user ? (0, _signavioI18n2.default)('removed __type__ license from __user__', {
      type: (0, _utils.findLicenseNameByType)(licenseType),
      user: _react2.default.createElement(_components.UserLink, { user: user })
    }) : (0, _signavioI18n2.default)('removed __type__ license', {
      type: (0, _utils.findLicenseNameByType)(licenseType)
    })
  }));
}


// WEBPACK FOOTER //
// ./packages/admin/lib/events/license/Deleted.js