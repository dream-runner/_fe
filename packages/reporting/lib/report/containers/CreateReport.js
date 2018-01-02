'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _components2 = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateReportContainer = function CreateReportContainer(_ref) {
  var createReport = _ref.createReport,
      onCreate = _ref.onCreate;
  return _react2.default.createElement(
    _components.Container,
    null,
    _react2.default.createElement(_components.DocumentTitle, { title: (0, _signavioI18n2.default)('Analytics - Create report') }),
    _react2.default.createElement(_components2.CreateReport, { onCreate: onCreate, disabled: createReport.pending }),
    _react2.default.createElement(
      _hints.Hint,
      { inline: true },
      (0, _signavioI18n2.default)('Give your report a name then press __key__ to create it.', {
        key: _react2.default.createElement(
          'kbd',
          { key: 'kbd', title: (0, _signavioI18n2.default)('Enter') },
          '\u21B5'
        )
      })
    ),
    createReport.rejected && _react2.default.createElement(
      _hints.Hint,
      { danger: true },
      createReport.reason
    )
  );
};

exports.default = (0, _recompose.compose)(_reactRouter.withRouter, (0, _effektifApi.connect)({
  createReport: {
    type: _effektifApi.types.REPORT,
    method: 'create'
  }
}), (0, _recompose.withHandlers)({
  onCreate: function onCreate(_ref2) {
    var createReport = _ref2.createReport;
    return function (report) {
      return createReport(report);
    };
  }
}), (0, _effektifApi.fulfillRequestThen)({
  createReport: function createReport(_ref3) {
    var history = _ref3.history,
        _createReport = _ref3.createReport;
    return history.push((0, _effektifApi.prependOrg)('/analytics/report/' + _createReport.value.id));
  }
}))(CreateReportContainer);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/containers/CreateReport.js