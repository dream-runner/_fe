'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindReportId = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// wraps action creators by injecting a report id into the action's payload
var bindReportId = function bindReportId(actionCreators, reportId) {
  return (0, _lodash.mapValues)(actionCreators, function (actionCreator) {
    return function () {
      var _actionCreator = actionCreator.apply(undefined, arguments),
          payload = _actionCreator.payload,
          rest = (0, _objectWithoutProperties3.default)(_actionCreator, ['payload']);

      return (0, _extends3.default)({}, rest, {
        payload: (0, _extends3.default)({
          reportId: reportId
        }, payload)
      });
    };
  });
};
exports.bindReportId = bindReportId;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/actions/index.js