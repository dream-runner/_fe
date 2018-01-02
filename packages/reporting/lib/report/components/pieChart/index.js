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

var _victory = require('victory');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _grid = require('@signavio/effektif-commons/lib/components/grid');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _chartCommons = require('../chartCommons');

var _Legend = require('./Legend');

var _Legend2 = _interopRequireDefault(_Legend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PieChart = function PieChart(_ref) {
  var rows = _ref.rows,
      theme = _ref.theme,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['rows', 'theme']);

  var data = rows.map(function (_ref2) {
    var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
        name = _ref3[0],
        value = _ref3[1];

    return {
      x: (0, _lodash.isArray)(name) ? '' : name,
      y: value
    };
  });

  return _react2.default.createElement(
    _grid.Row,
    { equalHeights: true, style: { marginTop: _styles.padding.normal } },
    _react2.default.createElement(
      _grid.Col,
      { md: 7, verticalAlign: 'middle' },
      _react2.default.createElement(_victory.VictoryPie, (0, _extends3.default)({}, rest, {
        data: data,
        labels: rows.map(function (_ref4) {
          var _ref5 = (0, _slicedToArray3.default)(_ref4, 2),
              value = _ref5[1];

          return value;
        }),
        labelComponent: _react2.default.createElement(_chartCommons.Tooltip, { active: false }),
        colorScale: theme.color.chart,
        animate: { velocity: 0.02 }
      }))
    ),
    _react2.default.createElement(
      _grid.Col,
      { md: 5, verticalAlign: 'middle' },
      _react2.default.createElement(_Legend2.default, (0, _extends3.default)({ rows: rows }, rest))
    )
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
    renderChart && _react2.default.createElement(PieChart, (0, _extends3.default)({ rows: rows }, rest))
  );
};

exports.default = (0, _styles.getTheme)(ChartMaskedWhileLoading);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/pieChart/index.js