'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _headers = require('@signavio/effektif-commons/lib/components/headers');

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ReportHeader(props) {
  var report = props.report,
      readOnly = props.readOnly,
      onRemove = props.onRemove,
      onBlur = props.onBlur,
      onSourceChange = props.onSourceChange,
      onShare = props.onShare;


  return _react2.default.createElement(_headers.PrimaryHeader, {
    autoFocus: !report,
    defaultValue: report && report.name,
    placeholder: (0, _signavioI18n2.default)("What's your report about?"),
    onBlur: onBlur,
    toolbar: report && _react2.default.createElement(_Toolbar2.default, {
      report: report,
      onSourceChange: onSourceChange,
      onRemove: onRemove,
      onShare: onShare,
      readOnly: readOnly
    }),
    readOnly: readOnly
  });
}


var enhance = (0, _recompose.withHandlers)({
  onBlur: function onBlur(_ref) {
    var report = _ref.report,
        onChange = _ref.onChange,
        onCreate = _ref.onCreate;
    return function (ev) {
      var name = ev.target.value;

      if (!name) {
        return;
      }

      if (!report) {
        onCreate({
          name: name,
          from: 'cases'
        });
      } else {
        onChange({ name: name });
      }
    };
  },

  onSourceChange: function onSourceChange(_ref2) {
    var onChange = _ref2.onChange;
    return function (source) {
      return onChange({ source: source });
    };
  }
});

exports.default = enhance(ReportHeader);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/Header.js