'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TaskLink;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _effektifApi = require('@signavio/effektif-api');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TaskLink(_ref) {
  var task = _ref.task,
      caseId = _ref.caseId;

  return _react2.default.createElement(
    _reactRouterDom.Link,
    { to: (0, _effektifApi.prependOrg)('/case/' + caseId + '/task/' + task.id) },
    (0, _utils.taskName)(task)
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/components/TaskLink.js