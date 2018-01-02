'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _effektifFields = require('@signavio/effektif-fields');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _effektifApi = require('@signavio/effektif-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCoreVariables = function getCoreVariables(from) {
  return {
    workflows: [],
    cases: [{ id: 'case', name: (0, _signavioI18n2.default)('Case'), type: { name: 'caseId' } }],
    tasks: [{ id: 'case', name: (0, _signavioI18n2.default)('Case'), type: { name: 'caseId' } }, { id: 'task', name: (0, _signavioI18n2.default)('Task'), type: { name: 'taskId' } }]
  }[from];
};

function ProvideFieldsContext(_ref) {
  var from = _ref.from,
      workflowId = _ref.workflowId,
      fetchWorkflow = _ref.fetchWorkflow,
      children = _ref.children;

  if (fetchWorkflow && fetchWorkflow.rejected) {
    return _react2.default.createElement(
      _hints.Hint,
      { danger: true },
      fetchWorkflow.reason
    );
  }

  if (fetchWorkflow && !fetchWorkflow.value) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      fetchWorkflow.reason
    );
  }

  var variables = (0, _lodash.union)(fetchWorkflow && fetchWorkflow.value && fetchWorkflow.value.variables || [], getCoreVariables(from));

  return _react2.default.createElement(
    _effektifFields.ProvideFieldsContext,
    { variables: variables },
    _react.Children.only(children)
  );
}

exports.default = (0, _effektifApi.connect)(function (_ref2) {
  var workflowId = _ref2.workflowId;
  return workflowId && {
    fetchWorkflow: {
      type: _effektifApi.types.WORKFLOW,
      id: workflowId,
      requiredFields: ['variables'],
      refresh: true
    }
  };
})(ProvideFieldsContext);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/ProvideFieldsContext.js