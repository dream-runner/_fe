'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _effektifApi = require('@signavio/effektif-api');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _components = require('../components');

var _validate = require('../utils/validate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ResultContainer(_ref) {
  var fetchResult = _ref.fetchResult,
      report = _ref.report,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['fetchResult', 'report']);

  if (fetchResult && fetchResult.rejected) {
    return _react2.default.createElement(
      _hints.Hint,
      { danger: true },
      (0, _signavioI18n2.default)('There was an error loading the results:'),
      _react2.default.createElement(
        'p',
        null,
        fetchResult.reason
      )
    );
  }

  var value = fetchResult && fetchResult.value && !fetchResult.pending ? fetchResult.value : {};

  return _react2.default.createElement(_components.Result, (0, _extends3.default)({
    report: report,
    loading: !fetchResult || fetchResult.pending
  }, value, rest));
}

var mapPropsToPromiseProps = function mapPropsToPromiseProps(_ref2) {
  var report = _ref2.report,
      blockRequest = _ref2.blockRequest,
      revision = _ref2.revision,
      selectionId = _ref2.selectionId;
  return {
    // wait for report to be fetched, then check if the selection can be requested
    fetchResult: !!report && !blockRequest && (0, _validate.canRequestResults)(report, selectionId) && {
      type: _effektifApi.types.RESULT,
      query: {
        reportId: report.id,
        selectionId: selectionId
      },
      refresh: revision // increment (or change) revision to enforce re-fetch
    }
  };
};

exports.default = (0, _effektifApi.connect)(mapPropsToPromiseProps)(ResultContainer);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/containers/Result.js