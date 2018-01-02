'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifApi = require('@signavio/effektif-api');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _higherOrder = require('@signavio/effektif-commons/lib/components/higher-order');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _CSVExport = require('./CSVExport');

var _CSVExport2 = _interopRequireDefault(_CSVExport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeader = function TableHeader(_ref) {
  var buttons = _ref.buttons,
      onCloseExport = _ref.onCloseExport,
      onDownloadCSV = _ref.onDownloadCSV,
      onExport = _ref.onExport,
      showCSVExport = _ref.showCSVExport,
      status = _ref.status;
  return _react2.default.createElement(
    'div',
    { className: 'clearfix', style: { marginBottom: _styles.padding.normal } },
    _react2.default.createElement(
      _hints.Hint,
      { inline: true, style: { lineHeight: _styles.variables.lineHeight.block + 'px' } },
      status
    ),
    _react2.default.createElement(
      'div',
      {
        className: 'pull-right',
        style: { height: _styles.variables.lineHeight.block + 'px' }
      },
      _react2.default.createElement(
        'div',
        { style: { display: 'inline-block', verticalAlign: 'top' } },
        buttons
      ),
      _react2.default.createElement(
        'div',
        { style: { paddingLeft: _styles.padding.small, display: 'inline-block' } },
        _react2.default.createElement(
          _buttons.IconButton,
          { onClick: onDownloadCSV, icon: 'cloud-download', light: true, block: true },
          (0, _signavioI18n2.default)('Download full result set as CSV')
        )
      )
    ),
    showCSVExport && _react2.default.createElement(_CSVExport2.default, { onClose: onCloseExport, onConfirm: onExport })
  );
};
exports.default = (0, _recompose.compose)(_higherOrder.getToken, (0, _recompose.withState)('showCSVExport', 'toggleCSVExport', false), (0, _recompose.withHandlers)({
  onCloseExport: function onCloseExport(_ref2) {
    var toggleCSVExport = _ref2.toggleCSVExport;
    return function () {
      toggleCSVExport(false);
    };
  },
  onDownloadCSV: function onDownloadCSV(_ref3) {
    var toggleCSVExport = _ref3.toggleCSVExport;
    return function () {
      toggleCSVExport(true);
    };
  },
  onExport: function onExport(_ref4) {
    var reportId = _ref4.reportId,
        selectionId = _ref4.selectionId,
        toggleCSVExport = _ref4.toggleCSVExport,
        token = _ref4.token;
    return function (format) {
      toggleCSVExport(false);

      window.open((0, _effektifApi.getBaseUrl)() + 'reports/' + reportId + '/export/' + selectionId + '/csv?format=' + format + '&token=' + token);
    };
  }
}))(TableHeader);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/table/Header.js