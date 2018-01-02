'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _comments = require('../comments');

var _events = require('../events');

var _CoreInformation = require('./CoreInformation');

var _CoreInformation2 = _interopRequireDefault(_CoreInformation);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InfoPanel(_ref) {
  var caseId = _ref.caseId,
      taskId = _ref.taskId,
      panel = _ref.panel;

  if (panel === 'events') {
    return _react2.default.createElement(_events.ActivityStream, { caseId: caseId, taskId: taskId });
  }

  if (panel === 'comments') {
    return _react2.default.createElement(_comments.Comments, { caseId: caseId, taskId: taskId });
  }

  if (panel === 'coreInfo') {
    return _react2.default.createElement(_CoreInformation2.default, { caseId: caseId });
  }

  return null;
}
exports.default = InfoPanel;


// WEBPACK FOOTER //
// ./packages/cases/lib/components/InfoPanel.js