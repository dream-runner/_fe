'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CaseLink;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _effektifApi = require('@signavio/effektif-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CaseLink(_ref) {
  var caseId = _ref.caseId,
      children = _ref.children;

  return _react2.default.createElement(
    _reactRouterDom.Link,
    { to: (0, _effektifApi.prependOrg)('/case/' + caseId) },
    children
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/components/CaseLink.js