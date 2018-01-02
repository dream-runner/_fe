'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canRequestResults = undefined;

var _lodash = require('lodash');

var canRequestResults = exports.canRequestResults = function canRequestResults(report, selectionId) {
  var _report$selections = report.selections,
      selections = _report$selections === undefined ? {} : _report$selections;


  if (!(0, _lodash.find)(selections, { id: selectionId })) {
    return false;
  }

  return true;
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/utils/validate.js