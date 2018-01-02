'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _effektifApi = require('@signavio/effektif-api');

exports.default = function (_ref) {
  var caseId = _ref.caseId,
      taskId = _ref.taskId;

  var url = '/' + (0, _effektifApi.getCurrentOrgKey)() + '/case/' + caseId;

  if (taskId) {
    return url + '/task/' + taskId;
  }

  return url;
};


// WEBPACK FOOTER //
// ./packages/cases/lib/caseUrl.js