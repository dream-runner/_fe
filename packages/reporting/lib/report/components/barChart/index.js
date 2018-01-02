'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _grid = require('@signavio/effektif-commons/lib/components/grid');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifFields = require('@signavio/effektif-fields');

var _effektifFields2 = _interopRequireDefault(_effektifFields);

var _chartCommons = require('../chartCommons');

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BarChart = function BarChart(_ref) {
  var rows = _ref.rows,
      columns = _ref.columns,
      theme = _ref.theme,
      resolveDataType = _ref.resolveDataType,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['rows', 'columns', 'theme', 'resolveDataType']);

  var backgroundColor = theme.color.chart[2];
  var rowsToShow = rows.slice(0, 20);

  var rowValues = rowsToShow.map(function (_ref2) {
    var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
        value = _ref3[1];

    return value;
  });
  var highestValue = (0, _lodash.max)(rowValues);

  var renderedRows = rowsToShow.map(function (_ref4) {
    var _ref5 = (0, _slicedToArray3.default)(_ref4, 2),
        name = _ref5[0],
        value = _ref5[1];

    return _react2.default.createElement(
      _grid.Row,
      { equalHeights: true, key: name, noPadding: true },
      _react2.default.createElement(
        _grid.Col,
        { md: 4 },
        _react2.default.createElement(
          _tiles.Tile,
          {
            small: true,
            toolbar: _react2.default.createElement(_chartCommons.Count, { value: value }),
            style: (0, _extends3.default)({}, _styles.utils.borderLeft('1px', 'solid', 'white'))
          },
          _react2.default.createElement(_effektifFields2.default, {
            readOnly: true,
            type: resolveDataType((0, _lodash.first)(columns).binding.expression),
            value: name,
            small: true
          })
        )
      ),
      _react2.default.createElement(
        _grid.Col,
        { md: 8 },
        _react2.default.createElement(_Bar2.default, {
          width: value / (highestValue / 100),
          backgroundColor: backgroundColor
        })
      )
    );
  });

  return _react2.default.createElement(
    'div',
    { style: { marginTop: _styles.padding.normal } },
    renderedRows
  );
};

// TODO: figure out how rows can be undefined if loading is false
var ChartMaskedWhileLoading = function ChartMaskedWhileLoading(_ref6) {
  var loading = _ref6.loading,
      rows = _ref6.rows,
      rest = (0, _objectWithoutProperties3.default)(_ref6, ['loading', 'rows']);

  var mask = _react2.default.createElement(
    _components.LoadingMask,
    null,
    (0, _signavioI18n2.default)('Refreshing...')
  );
  var renderChart = !loading && !!rows;

  return _react2.default.createElement(
    _components.KeepContent,
    { mask: mask },
    renderChart && _react2.default.createElement(BarChart, (0, _extends3.default)({ rows: rows }, rest))
  );
};

exports.default = (0, _effektifFields.getResolveDataType)((0, _styles.getTheme)(ChartMaskedWhileLoading));


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/barChart/index.js