'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducerUtils = require('../../utils/reducerUtils');

var _report = require('../actions/report');

function accessListReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _report.REPORT_UPDATE_ACCESS:
      return payload.access;
    default:
      return state;
  }
}

var accessReducer = (0, _reducerUtils.selectPropertyReduce)(function (state, _ref2) {
  var payload = _ref2.payload;
  return payload && payload.accessType;
}, accessListReducer);

exports.default = accessReducer;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/reducers/accessReducer.js