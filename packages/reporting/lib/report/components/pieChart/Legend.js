'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifFields = require('@signavio/effektif-fields');

var _effektifFields2 = _interopRequireDefault(_effektifFields);

var _chartCommons = require('../chartCommons');

var _ColorSquare = require('./ColorSquare');

var _ColorSquare2 = _interopRequireDefault(_ColorSquare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Legend = function Legend(_ref) {
  var theme = _ref.theme,
      rows = _ref.rows,
      columns = _ref.columns,
      resolveDataType = _ref.resolveDataType,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables;

  var bindingExpression = (0, _lodash.first)(columns).binding.expression;

  return _react2.default.createElement(
    'div',
    { style: { padding: _styles.padding.normal } },
    _react2.default.createElement(
      _components.List,
      null,
      rows.map(function (_ref2, i) {
        var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
            name = _ref3[0],
            value = _ref3[1];

        return _react2.default.createElement(
          _tiles.Tile,
          {
            key: name,
            small: true,
            header: _react2.default.createElement(_ColorSquare2.default, { backgroundColor: theme.color.chart[i] }),
            toolbar: _react2.default.createElement(_chartCommons.Count, { value: value }),
            style: (0, _extends3.default)({}, _styles.utils.borderLeft('1px', 'solid', 'white'))
          },
          (0, _lodash.isArray)(name) ? _react2.default.createElement(
            _tiles.TextTile,
            { small: true },
            _react2.default.createElement(
              _components.Empty,
              null,
              (0, _signavioI18n2.default)('__count__ other __typeNamePlural__', {
                count: name.length,
                typeNamePlural: _effektifFields.expressionUtils.resolveName(dataTypeDescriptors, variables, bindingExpression)
              })
            )
          ) : _react2.default.createElement(_effektifFields2.default, {
            readOnly: true,
            type: resolveDataType(bindingExpression),
            value: name,
            small: true
          })
        );
      })
    )
  );
};

exports.default = (0, _recompose.compose)(_effektifFields.getResolveDataType, _effektifFields.getFieldsContext, _styles.getTheme)(Legend);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/pieChart/Legend.js