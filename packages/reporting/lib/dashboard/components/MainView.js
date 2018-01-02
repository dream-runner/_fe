'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = MainView;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _ReportPreview = require('./ReportPreview');

var _ReportPreview2 = _interopRequireDefault(_ReportPreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ReportsList(_ref) {
  var reports = _ref.reports;

  if (!reports || reports.length === 0) {
    return _react2.default.createElement(
      _hints.Hint,
      { view: true },
      (0, _signavioI18n2.default)('You have not created any reports yet.')
    );
  }

  return _react2.default.createElement(
    _components.List,
    null,
    reports.map(function (report) {
      return _react2.default.createElement(_ReportPreview2.default, (0, _extends3.default)({ key: report.id }, report));
    })
  );
}

function MainView(props) {
  return _react2.default.createElement(
    'div',
    { className: 'view analytics-dashboard' },
    _react2.default.createElement(
      'div',
      { className: 'view-header' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-sm-7 col-md-8 col-lg-9' },
          _react2.default.createElement(
            _components.PageHeader,
            {
              hint: (0, _signavioI18n2.default)('Analyze your processes and create reports to share with your colleagues.')
            },
            (0, _signavioI18n2.default)('Analytics')
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-sm-5 col-md-4 col-lg-3' },
          _react2.default.createElement(
            'div',
            { className: 'actions-menu' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: (0, _effektifApi.prependOrg)('/analytics/report') },
              _react2.default.createElement(
                _buttons.IconButton,
                { light: true, block: true, icon: 'plus' },
                (0, _signavioI18n2.default)('Create new report')
              )
            )
          )
        )
      )
    ),
    _react2.default.createElement(_components.Divider, null),
    _react2.default.createElement(
      'div',
      { className: 'view-content' },
      _react2.default.createElement(ReportsList, props)
    )
  );
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/dashboard/components/MainView.js