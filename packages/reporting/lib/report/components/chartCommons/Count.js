'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifFields = require('@signavio/effektif-fields');

var _effektifFields2 = _interopRequireDefault(_effektifFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Count = function Count(_ref) {
  var value = _ref.value;

  return _react2.default.createElement(
    'div',
    { style: (0, _extends3.default)({}, _styles.utils.borderLeft('1px', 'solid', 'white')) },
    value ? _react2.default.createElement(_effektifFields2.default, { readOnly: true, small: true, type: _effektifFields.numberType, value: value }) : '-'
  );
};

exports.default = Count;


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/chartCommons/Count.js