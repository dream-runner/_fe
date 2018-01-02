'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InlineUser;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _effektifApi = require('@signavio/effektif-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InlineUser(_ref) {
  var user = _ref.user;

  return _react2.default.createElement(
    _components.Popover,
    { small: true, placement: 'top', popover: _effektifApi.userUtils.name(user) },
    _react2.default.createElement(_workflowOrganizations.Avatar, {
      micro: true,
      user: user,
      style: {
        display: 'inline-block',
        verticalAlign: 'top'
      }
    })
  );
}


// WEBPACK FOOTER //
// ./packages/events/lib/components/InlineUser.js