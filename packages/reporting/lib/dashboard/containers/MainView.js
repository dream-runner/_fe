'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _components = require('@signavio/effektif-commons/lib/components');

var _MainView = require('../components/MainView');

var _MainView2 = _interopRequireDefault(_MainView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MainViewContainer(_ref) {
  var fetchReports = _ref.fetchReports;

  if (fetchReports.pending) {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading reports...')
    );
  }

  if (fetchReports.error) {
    return _react2.default.createElement(
      _hints.Hint,
      { danger: true },
      (0, _signavioI18n2.default)('There was an error loading the reports:'),
      _react2.default.createElement(
        'p',
        null,
        fetchReports.reason
      )
    );
  }

  return _react2.default.createElement(
    _components.Container,
    null,
    _react2.default.createElement(_components.DocumentTitle, { title: (0, _signavioI18n2.default)('Analytics - Dashboard') }),
    _react2.default.createElement(_MainView2.default, { reports: fetchReports.value })
  );
}

exports.default = (0, _effektifApi.connect)({
  fetchReports: {
    type: _effektifApi.types.REPORTS,
    refresh: true
  }
})(MainViewContainer);


// WEBPACK FOOTER //
// ./packages/reporting/lib/dashboard/containers/MainView.js