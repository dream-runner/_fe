'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = Candidate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _effektifApi = require('@signavio/effektif-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Candidate(_ref) {
  var circular = _ref.circular,
      candidate = _ref.candidate,
      disabled = _ref.disabled,
      style = _ref.style,
      small = _ref.small,
      className = _ref.className,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['circular', 'candidate', 'disabled', 'style', 'small', 'className']);

  return _react2.default.createElement(
    _components.Popover,
    (0, _extends3.default)({}, rest, {
      small: true,
      placement: 'top',
      popover: _effektifApi.userUtils.name(candidate)
    }),
    _react2.default.createElement(_workflowOrganizations.Avatar, {
      circular: circular,
      small: small,
      style: style,
      className: className,
      user: candidate,
      disabled: disabled
    })
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/components/Candidate.js