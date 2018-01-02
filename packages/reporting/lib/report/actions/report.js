'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REPORT_INIT_DEFAULTS_FOR_WORKFLOW = exports.REPORT_COERCE_TO_VARIABLES = exports.REPORT_UPDATE_ACCESS = exports.REPORT_CHANGE = exports.REPORT_SAVE_FAILURE = exports.REPORT_SAVE_SUCCESS = exports.REPORT_SAVE = exports.REPORT_LOAD_FAILURE = exports.REPORT_LOAD_SUCCESS = exports.REPORT_LOAD = undefined;

var _effektifApi = require('@signavio/effektif-api');

var REPORT_LOAD = exports.REPORT_LOAD = 'REPORT_LOAD';
var REPORT_LOAD_SUCCESS = exports.REPORT_LOAD_SUCCESS = 'REPORT_LOAD_SUCCESS';
var REPORT_LOAD_FAILURE = exports.REPORT_LOAD_FAILURE = 'REPORT_LOAD_FAILURE';
var REPORT_SAVE = exports.REPORT_SAVE = 'REPORT_SAVE';
var REPORT_SAVE_SUCCESS = exports.REPORT_SAVE_SUCCESS = 'REPORT_SAVE_SUCCESS';
var REPORT_SAVE_FAILURE = exports.REPORT_SAVE_FAILURE = 'REPORT_SAVE_FAILURE';
var REPORT_CHANGE = exports.REPORT_CHANGE = 'REPORT_CHANGE';
var REPORT_UPDATE_ACCESS = exports.REPORT_UPDATE_ACCESS = 'REPORT_UPDATE_ACCESS';
var REPORT_COERCE_TO_VARIABLES = exports.REPORT_COERCE_TO_VARIABLES = 'REPORT_COERCE_TO_VARIABLES';
var REPORT_INIT_DEFAULTS_FOR_WORKFLOW = exports.REPORT_INIT_DEFAULTS_FOR_WORKFLOW = 'REPORT_INIT_DEFAULTS_FOR_WORKFLOW';

exports.default = {
  loadReport: function loadReport(query) {
    return {
      type: REPORT_LOAD,
      payload: {
        query: query
      }
    };
  },
  loadReportSuccess: function loadReportSuccess(query, report) {
    return {
      type: REPORT_LOAD_SUCCESS,
      payload: {
        query: query,
        report: report,
        reportId: report.id
      }
    };
  },
  loadReportFailure: function loadReportFailure(query, error) {
    return {
      type: REPORT_LOAD_FAILURE,
      payload: {
        query: query,
        error: error
      }
    };
  },
  saveReport: function saveReport(id) {
    return {
      type: REPORT_SAVE,
      payload: {
        id: id,
        reportId: id
      }
    };
  },
  saveReportSuccess: function saveReportSuccess(id, report) {
    return {
      type: REPORT_SAVE_SUCCESS,
      payload: {
        id: id,
        report: report,
        reportId: report.id
      }
    };
  },
  saveReportFailure: function saveReportFailure(id, error) {
    return {
      type: REPORT_SAVE_FAILURE,
      payload: {
        id: id,
        error: error
      }
    };
  },
  changeReport: function changeReport(reportId, changes) {
    return {
      type: REPORT_CHANGE,
      payload: {
        reportId: reportId,
        changes: changes
      }
    };
  },
  updateAccess: function updateAccess(reportId, accessType, access) {
    return {
      type: REPORT_UPDATE_ACCESS,
      payload: {
        reportId: reportId,
        accessType: accessType,
        access: access
      }
    };
  },


  // removes references to variables that are not included in the passed `variables` array
  initDefaultsForWorkflow: function initDefaultsForWorkflow(reportId, workflow) {
    return {
      type: REPORT_INIT_DEFAULTS_FOR_WORKFLOW,
      payload: {
        reportId: reportId,
        workflow: workflow
      }
    };
  }
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/actions/report.js