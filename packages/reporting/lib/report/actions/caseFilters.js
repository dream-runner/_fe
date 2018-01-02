'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONDITION_TYPE_CHANGE = exports.CONDITION_TYPE_CHANGE = 'CONDITION_TYPE_CHANGE';
var CONDITION_REPLACE = exports.CONDITION_REPLACE = 'CONDITION_REPLACE';
var CONDITION_REMOVE = exports.CONDITION_REMOVE = 'CONDITION_REMOVE';
var CONDITION_ADD = exports.CONDITION_ADD = 'CONDITION_ADD';
var CONDITION_CHANGE_WORKFLOW_SELECTION = exports.CONDITION_CHANGE_WORKFLOW_SELECTION = 'CONDITION_CHANGE_WORKFLOW_SELECTION';
var CONDITION_CHANGE_CASE_STATE_SELECTION = exports.CONDITION_CHANGE_CASE_STATE_SELECTION = 'CONDITION_CHANGE_CASE_STATE_SELECTION';

exports.default = {
  changeConditionType: function changeConditionType(newType) {
    return {
      type: CONDITION_TYPE_CHANGE,
      payload: {
        newType: newType
      }
    };
  },

  replaceCondition: function replaceCondition(index, newCondition) {
    return {
      type: CONDITION_REPLACE,
      payload: {
        index: index,
        newCondition: newCondition
      }
    };
  },

  removeCondition: function removeCondition(index) {
    return {
      type: CONDITION_REMOVE,
      payload: {
        index: index
      }
    };
  },

  addCondition: function addCondition() {
    return {
      type: CONDITION_ADD
    };
  },

  changeWorkflowSelection: function changeWorkflowSelection(workflowId) {
    return {
      type: CONDITION_CHANGE_WORKFLOW_SELECTION,
      payload: {
        workflowId: workflowId
      }
    };
  },

  changeCaseStateSelection: function changeCaseStateSelection(caseState) {
    return {
      type: CONDITION_CHANGE_CASE_STATE_SELECTION,
      payload: {
        caseState: caseState
      }
    };
  }
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/actions/caseFilters.js