'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditWorkflowIdPure = exports.WorkflowOption = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _reactForms = require('@signavio/react-forms');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _Show = require('./Show');

var _higherOrder = require('../../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WorkflowOption = function WorkflowOption(_ref) {
  var highlightedName = _ref.highlightedName,
      workflow = _ref.workflow,
      services = _ref.services,
      subtitle = _ref.subtitle,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['highlightedName', 'workflow', 'services', 'subtitle']);
  return _react2.default.createElement(
    _forms.Option,
    rest,
    _react2.default.createElement(_Show.ShowWorkflowIdPure, {
      workflow: workflow,
      services: services,
      highlightedName: highlightedName,
      subtitle: subtitle,
      transparent: true
    })
  );
};

exports.WorkflowOption = WorkflowOption;
var EditWorkflowIdPure = function EditWorkflowIdPure(_ref2) {
  var value = _ref2.value,
      workflows = _ref2.workflows,
      services = _ref2.services,
      disableItem = _ref2.disableItem,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['value', 'workflows', 'services', 'disableItem']);
  return _react2.default.createElement(
    _forms.DropdownSelect,
    (0, _extends3.default)({ value: value }, (0, _lodash.omit)(rest, 'type')),
    workflows.map(function (workflow) {
      var disabledReason = disableItem && disableItem(workflow);
      return _react2.default.createElement(WorkflowOption, {
        key: workflow.id,
        value: workflow.id,
        name: workflow.name,
        workflow: workflow,
        services: services,
        disabled: !!disabledReason,
        subtitle: disabledReason || undefined
      });
    })
  );
};

exports.EditWorkflowIdPure = EditWorkflowIdPure;
var connectValue = (0, _higherOrder.connectSpinning)(function (_ref3) {
  var refresh = _ref3.refresh,
      fetchOnMount = _ref3.fetchOnMount;
  return {
    workflows: { type: _effektifApi.types.WORKFLOWS, refresh: refresh, fetchOnMount: fetchOnMount },
    services: { type: _effektifApi.types.SERVICES }
  };
});

exports.default = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnChange, (0, _higherOrder.createClearable)({ triggerOnComplete: true }), connectValue)(EditWorkflowIdPure);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/workflowId/Edit.js