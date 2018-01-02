'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ConfigurationToolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _ToolbarActions = require('./ToolbarActions');

var _ToolbarActions2 = _interopRequireDefault(_ToolbarActions);

var _AccessRightsIndicator = require('./AccessRightsIndicator');

var _AccessRightsIndicator2 = _interopRequireDefault(_AccessRightsIndicator);

var _SharingInfo = require('./SharingInfo');

var _SharingInfo2 = _interopRequireDefault(_SharingInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConfigurationToolbar(_ref) {
  var report = _ref.report,
      readOnly = _ref.readOnly,
      onRemove = _ref.onRemove;

  return _react2.default.createElement(_components.Toolbar, {
    left: _react2.default.createElement(_AccessRightsIndicator2.default, {
      reportId: report.id,
      creatorId: report.creatorId,
      access: report.access
    }),
    right: _react2.default.createElement(_ToolbarActions2.default, {
      reportId: report.id,
      onRemove: onRemove,
      readOnly: readOnly
    })
  });
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/Toolbar.js