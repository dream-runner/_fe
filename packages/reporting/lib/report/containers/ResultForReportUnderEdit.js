'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Result = require('./Result');

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRedux.connect)(function (state, _ref) {
  var reportId = _ref.reportId;
  return (0, _extends3.default)({}, state.reporting.reports[reportId]);
})(function (_ref2) {
  var report = _ref2.report,
      meta = _ref2.meta,
      selectionId = _ref2.selectionId,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['report', 'meta', 'selectionId']);
  return _react2.default.createElement(_Result2.default, (0, _extends3.default)({
    report: report,
    selectionId: selectionId,
    revision: meta.revisionsResultsDependOn[selectionId],
    blockRequest: meta.revisionsResultsDependOn[selectionId] > meta.committedRevision
  }, rest));
});


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/containers/ResultForReportUnderEdit.js