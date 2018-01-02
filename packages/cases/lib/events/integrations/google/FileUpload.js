'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = GoogleUploadEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GoogleUploadEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);

  return _react2.default.createElement(_workflowEvents.UploadEvent, (0, _extends3.default)({}, rest, {
    event: event,
    serviceName: (0, _signavioI18n2.default)('Google Drive'),
    icon: 'google-drive'
  }));
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/integrations/google/FileUpload.js