'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _SimpleTable = require('./SimpleTable');

var _SimpleTable2 = _interopRequireDefault(_SimpleTable);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowCountMessage = function rowCountMessage(count, total) {
  if (count === 0) {
    return (0, _signavioI18n2.default)('The result is empty');
  }

  return total === count ? (0, _signavioI18n2.default)('Showing all __count__ result rows', { count: total }) : (0, _signavioI18n2.default)('Showing first __count__ of __total__ result rows', { count: count, total: total });
};


var ResultTable = function ResultTable(props) {
  var loading = props.loading,
      rows = props.rows,
      columns = props.columns,
      rowsCount = props.rowsCount,
      reportId = props.reportId,
      selectionId = props.selectionId,
      headerButtons = props.headerButtons;


  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Header2.default, {
      status: !loading && !!rows && columns.length !== 0 && rowCountMessage(rows.length, rowsCount),
      reportId: reportId,
      selectionId: selectionId,
      buttons: headerButtons
    }),
    columns.length === 0 ? _react2.default.createElement(
      _hints.Hint,
      null,
      (0, _signavioI18n2.default)("There are no columns selected. Go to 'Configure Columns' above to display results here.")
    ) : _react2.default.createElement(_SimpleTable2.default, props)
  );
};

exports.default = ResultTable;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/table/Table.js