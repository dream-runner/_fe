'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table');

var _effektifFields = require('@signavio/effektif-fields');

var _effektifFields2 = _interopRequireDefault(_effektifFields);

var _components = require('@signavio/effektif-commons/lib/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataCell = function DataCell(_ref) {
  var rowIndex = _ref.rowIndex,
      type = _ref.type,
      value = _ref.value,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['rowIndex', 'type', 'value']);
  return _react2.default.createElement(
    _fixedDataTable.Cell,
    null,
    type ? _react2.default.createElement(_effektifFields2.default, (0, _extends3.default)({ readOnly: true, type: type, value: value, emptyContent: '-' }, rest)) : _react2.default.createElement(
      _components.Empty,
      { block: true },
      '-'
    )
  );
};

exports.default = DataCell;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/table/DataCell.js