'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToReport = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _effektifApi = require('@signavio/effektif-api');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _tabs = require('@signavio/effektif-commons/lib/components/tabs');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _utils = require('../utils');

var _report = require('../actions/report');

var _report2 = _interopRequireDefault(_report);

var _components2 = require('../components');

var _General = require('./General');

var _General2 = _interopRequireDefault(_General);

var _Share = require('./Share');

var _Share2 = _interopRequireDefault(_Share);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadData(props) {
  var id = props.match.params.id;

  props.loadReport({ id: id });
}

var ShowReportContainer = function (_PureComponent) {
  (0, _inherits3.default)(ShowReportContainer, _PureComponent);

  function ShowReportContainer() {
    (0, _classCallCheck3.default)(this, ShowReportContainer);
    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.apply(this, arguments));
  }

  ShowReportContainer.prototype.componentDidMount = function componentDidMount() {
    loadData(this.props);
  };

  ShowReportContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      loadData(nextProps);
    }
  };

  ShowReportContainer.prototype.render = function render() {
    return this.props.report ? this.renderContent() : this.renderLoading();
  };

  ShowReportContainer.prototype.renderLoading = function renderLoading() {
    return _react2.default.createElement(
      _hints.Hint,
      { loading: true },
      (0, _signavioI18n2.default)('Loading the report...')
    );
  };

  ShowReportContainer.prototype.renderContent = function renderContent() {
    var _props = this.props,
        report = _props.report,
        changeReport = _props.changeReport,
        removeReport = _props.removeReport,
        updateAccess = _props.updateAccess,
        match = _props.match,
        style = _props.style,
        user = _props.user;


    var readOnly = !(0, _utils.hasWriteAccess)(report.access, user.id);

    return _react2.default.createElement(
      _components.Container,
      null,
      _react2.default.createElement(
        'div',
        { className: 'view configuration' },
        _react2.default.createElement(_components.DocumentTitle, {
          title: (0, _signavioI18n2.default)('Report - __name__', { name: report.name })
        }),
        _react2.default.createElement(
          'div',
          { className: 'view-header' },
          _react2.default.createElement(_components2.Header, {
            report: report,
            onChange: function onChange(changes) {
              return changeReport(report.id, changes);
            },
            onRemove: removeReport,
            readOnly: readOnly
          })
        ),
        _react2.default.createElement(
          _tabs.TabBar,
          style('tabBar'),
          _react2.default.createElement(
            _tabs.LinkTab,
            {
              to: (0, _effektifApi.prependOrg)('/analytics/report/' + report.id + '/general'),
              onlyActiveOnIndex: true
            },
            (0, _signavioI18n2.default)('General')
          ),
          _react2.default.createElement(
            _tabs.LinkTab,
            { to: (0, _effektifApi.prependOrg)('/analytics/report/' + report.id + '/share') },
            (0, _signavioI18n2.default)('Share')
          )
        ),
        _react2.default.createElement(
          _reactRouter.Switch,
          null,
          _react2.default.createElement(_reactRouter.Route, {
            path: match.url + '/general',
            render: function render(routerProps) {
              return _react2.default.createElement(_General2.default, (0, _extends3.default)({}, routerProps, { report: report, readOnly: readOnly }));
            }
          }),
          _react2.default.createElement(_reactRouter.Route, {
            path: match.url + '/share',
            render: function render(routerProps) {
              return _react2.default.createElement(_Share2.default, (0, _extends3.default)({}, routerProps, {
                report: report,
                readOnly: readOnly,
                onUpdateAccess: function onUpdateAccess(accessType, access) {
                  return updateAccess(report.id, accessType, access);
                }
              }));
            }
          }),
          _react2.default.createElement(_reactRouter.Redirect, { to: match.url + '/general' })
        )
      )
    );
  };

  return ShowReportContainer;
}(_react.PureComponent);

var mapStateToProps = function mapStateToProps(state, props) {
  var id = props.match.params.id;
  // TODO `state.reporting...` implies knowledge about the outside
  // (i.e. under which state key the main app stores the reporting state)

  var reportWrapper = state.reporting.reports[id];
  return {
    report: reportWrapper && reportWrapper.report
  };
};

var connectToReport = exports.connectToReport = (0, _recompose.compose)(_effektifApi.withUser, (0, _reactRedux.connect)(mapStateToProps, {
  loadReport: _report2.default.loadReport,
  changeReport: _report2.default.changeReport,
  updateAccess: _report2.default.updateAccess
}), (0, _effektifApi.connect)(function (_ref) {
  var match = _ref.match;
  return {
    removeReport: {
      type: _effektifApi.types.REPORT,
      id: match.params.id,
      method: 'remove'
    }
  };
}), (0, _effektifApi.fulfillRequestThen)({
  removeReport: function removeReport(_ref2) {
    var history = _ref2.history;
    return history.push((0, _effektifApi.prependOrg)('/analytics'));
  }
}), (0, _styles.defaultStyle)(function (_ref3) {
  var padding = _ref3.padding;
  return {
    tabBar: {
      marginTop: padding.large,
      marginBottom: padding.large
    }
  };
}));

exports.default = connectToReport(ShowReportContainer);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/containers/ShowReport.js