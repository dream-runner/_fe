'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifFields = require('@signavio/effektif-fields');

var _effektifApi = require('@signavio/effektif-api');

var _SubcaseTile = require('./SubcaseTile');

var _SubcaseTile2 = _interopRequireDefault(_SubcaseTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SubCaseRow(_ref) {
  var style = _ref.style,
      fetchCase = _ref.fetchCase,
      subcase = _ref.subcase;

  var caze = fetchCase.value || {
    createTime: subcase.time,
    dueDate: subcase.dueDate,
    closeTime: subcase.closeTime,
    id: subcase.calledCaseId,
    name: subcase.calledCaseName
  };

  return _react2.default.createElement(
    'tr',
    style,
    _react2.default.createElement(
      'td',
      style('subcase'),
      _react2.default.createElement(_SubcaseTile2.default, { caze: caze })
    ),
    _react2.default.createElement(
      'td',
      style('date'),
      _react2.default.createElement(_effektifFields.Field, { readOnly: true, value: caze.createTime, type: (0, _effektifFields.dateTimeType)() })
    ),
    _react2.default.createElement(
      'td',
      style('date'),
      _react2.default.createElement(_effektifFields.Field, {
        readOnly: true,
        value: caze.dueDate,
        type: (0, _effektifFields.dateTimeType)(),
        emptyContent: '-'
      })
    ),
    _react2.default.createElement(
      'td',
      style('date'),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_effektifFields.Field, {
          readOnly: true,
          value: caze.closeTime,
          type: (0, _effektifFields.dateTimeType)(),
          emptyContent: '-'
        })
      )
    )
  );
}

var styled = (0, _styles.defaultStyle)(function () {
  return {
    date: (0, _extends3.default)({}, _styles.utils.borderBottom(1, 'solid', 'white'), _styles.utils.borderLeft(1, 'solid', 'white'), _styles.utils.media.xs({
      display: 'none'
    })),
    subcase: (0, _extends3.default)({}, _styles.utils.borderBottom(1, 'solid', 'white'))
  };
});

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref2) {
  var subcase = _ref2.subcase;
  return {
    fetchCase: {
      id: subcase.calledCaseId,
      type: _effektifApi.types.CASE
    }
  };
}), styled)(SubCaseRow);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/SubCaseRow.js