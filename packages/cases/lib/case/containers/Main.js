'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _components2 = require('../../components');

var _CaseDetail = require('./CaseDetail');

var _CaseDetail2 = _interopRequireDefault(_CaseDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function Main(_ref) {
  var match = _ref.match,
      panel = _ref.panel,
      onPanelChange = _ref.onPanelChange;
  var caseId = match.params.caseId;


  return _react2.default.createElement(
    _components.View,
    null,
    _react2.default.createElement(
      _components2.MainContainer,
      {
        showPanel: !!panel,
        toolbar: _react2.default.createElement(_components2.Toolbar, {
          category: panel,
          caseId: caseId,
          onCategoryChange: onPanelChange
        }),
        panel: _react2.default.createElement(_components2.InfoPanel, { caseId: caseId, panel: panel })
      },
      _react2.default.createElement(_CaseDetail2.default, { caseId: caseId })
    )
  );
};

exports.default = (0, _components2.withPanelHandling)(Main);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/containers/Main.js