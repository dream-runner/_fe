'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _fixedDataTable = require('fixed-data-table');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifFields = require('@signavio/effektif-fields');

var _HeaderCell = require('./HeaderCell');

var _HeaderCell2 = _interopRequireDefault(_HeaderCell);

var _DataCell = require('./DataCell');

var _DataCell2 = _interopRequireDefault(_DataCell);

var _resolveTypeIfExists = require('./resolveTypeIfExists');

var _resolveTypeIfExists2 = _interopRequireDefault(_resolveTypeIfExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calcDefaultColumnWidth = function calcDefaultColumnWidth(columnWidths, columnsCount) {
  var totalWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var totalFixedWidth = (0, _lodash.sum)((0, _lodash.values)(columnWidths));
  var fixedWidthsCount = (0, _lodash.values)(columnWidths).length;
  // distribute remaining space evently, but keep a min width of 200px
  return Math.max(200, (totalWidth - totalFixedWidth) / (columnsCount - fixedWidthsCount));
};

var totalWidth = function totalWidth(columnWidths, columnsCount, defaultColumnWidth) {
  var totalFixedWidth = (0, _lodash.sum)((0, _lodash.values)(columnWidths));
  var fixedWidthsCount = (0, _lodash.values)(columnWidths).length;
  return totalFixedWidth + (columnsCount - fixedWidthsCount) * defaultColumnWidth;
};

var belongsToCurrentGroup = function belongsToCurrentGroup(groupBy, col, colIndex, rows, rowIndex) {
  return (0, _lodash.some)(groupBy, function (binding) {
    return binding.expression === col.binding.expression && rowIndex > 0 && rows[rowIndex][colIndex] === rows[rowIndex - 1][colIndex];
  });
};

var GroupExtensionCell = function GroupExtensionCell() {
  return _react2.default.createElement(_fixedDataTable.Cell, { className: 'groupExtensionCell' });
};

var SimpleTable = function (_PureComponent) {
  (0, _inherits3.default)(SimpleTable, _PureComponent);

  function SimpleTable(props) {
    (0, _classCallCheck3.default)(this, SimpleTable);
    return (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));
  }

  SimpleTable.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        columns = _props.columns,
        columnWidths = _props.columnWidths,
        setColumnWidths = _props.setColumnWidths;

    if (nextProps.columns !== columns) {
      setColumnWidths((0, _lodash.pickBy)(columnWidths, function (val, id) {
        return !!nextProps.columns.find(function (col) {
          return col.id === id;
        });
      }));
    }
  };

  SimpleTable.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updateDefaultColumnWidth();
  };

  SimpleTable.prototype.componentDidMount = function componentDidMount() {
    this.updateDefaultColumnWidth();
  };

  SimpleTable.prototype.updateDefaultColumnWidth = function updateDefaultColumnWidth() {
    var _props2 = this.props,
        columns = _props2.columns,
        columnWidths = _props2.columnWidths,
        defaultColumnWidth = _props2.defaultColumnWidth,
        setDefaultColumnWidth = _props2.setDefaultColumnWidth;

    var newDefaultColumnWidth = calcDefaultColumnWidth(columnWidths, columns.length, this.containerEl.offsetWidth);
    if (defaultColumnWidth !== newDefaultColumnWidth) {
      setDefaultColumnWidth(calcDefaultColumnWidth(columnWidths, columns.length, this.containerEl.offsetWidth));
    }
  };

  SimpleTable.prototype.render = function render() {
    var _this2 = this;

    var _props3 = this.props,
        _props3$rows = _props3.rows,
        rows = _props3$rows === undefined ? [] : _props3$rows,
        _props3$rowsCount = _props3.rowsCount,
        rowsCount = _props3$rowsCount === undefined ? 0 : _props3$rowsCount,
        columns = _props3.columns,
        loading = _props3.loading,
        columnWidths = _props3.columnWidths,
        setColumnWidths = _props3.setColumnWidths,
        defaultColumnWidth = _props3.defaultColumnWidth,
        style = _props3.style;

    var width = totalWidth(columnWidths, columns.length, defaultColumnWidth);

    return _react2.default.createElement(
      'div',
      style,
      _react2.default.createElement(
        'div',
        (0, _extends4.default)({
          ref: function ref(_ref) {
            _this2.containerEl = _ref;
          }
        }, style('container')),
        _react2.default.createElement(
          _fixedDataTable.Table,
          {
            rowHeight: _styles.variables.lineHeight.block,
            rowsCount: rows.length,
            width: width,
            height: (rows.length + 1) * _styles.variables.lineHeight.block + 2,
            headerHeight: _styles.variables.lineHeight.block,
            onColumnResizeEndCallback: function onColumnResizeEndCallback(newWidth, columnKey) {
              return setColumnWidths((0, _extends4.default)({}, columnWidths, (0, _defineProperty3.default)({}, columnKey, Math.max(newWidth, 40))));
            },
            isColumnResizing: false
          },
          this.renderColumns()
        ),
        rows.length === 0 && _react2.default.createElement(
          'div',
          style('emptyMessage'),
          loading ? _react2.default.createElement(
            _hints.Hint,
            { loading: true, inline: true },
            (0, _signavioI18n2.default)('Fetching result rows...')
          ) : _react2.default.createElement(
            _components.Empty,
            null,
            (0, _signavioI18n2.default)('The result is empty')
          )
        )
      )
    );
  };

  SimpleTable.prototype.renderColumns = function renderColumns() {
    var _props4 = this.props,
        rows = _props4.rows,
        columns = _props4.columns,
        groupBy = _props4.groupBy,
        dataTypeDescriptors = _props4.dataTypeDescriptors,
        variables = _props4.variables,
        columnWidths = _props4.columnWidths,
        defaultColumnWidth = _props4.defaultColumnWidth;


    return columns.map(function (col, colIndex) {
      return _react2.default.createElement(_fixedDataTable.Column, {
        columnKey: col.id,
        key: col.id,
        header: _react2.default.createElement(_HeaderCell2.default, col),
        cell: function cell(_ref2) {
          var rowIndex = _ref2.rowIndex;
          return belongsToCurrentGroup(groupBy, col, colIndex, rows, rowIndex) ? _react2.default.createElement(GroupExtensionCell, null) : _react2.default.createElement(_DataCell2.default, {
            forceSingleLine: true,
            type: (0, _resolveTypeIfExists2.default)(dataTypeDescriptors, variables, col.binding.expression),
            value: rows[rowIndex][colIndex]
          });
        },
        width: columnWidths[col.id] || defaultColumnWidth,
        isResizable: true
      });
    });
  };

  return SimpleTable;
}(_react.PureComponent);

SimpleTable.defaultProps = {
  rows: []
};

var enhance = (0, _recompose.compose)(_effektifFields.getFieldsContext, (0, _styles.defaultStyle)(function (theme) {
  return {
    container: {
      width: '100%',
      overflow: 'auto'
    },

    emptyMessage: {
      background: theme.color.mono.light,
      textAlign: 'center',
      paddingTop: theme.padding.large,
      paddingBottom: theme.padding.large
    }
  };
}), (0, _recompose.withState)('columnWidths', 'setColumnWidths', {}), (0, _recompose.withState)('defaultColumnWidth', 'setDefaultColumnWidth', 200));

exports.default = enhance(SimpleTable);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/table/SimpleTable.js