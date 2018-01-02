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

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('../actions');

var _caseFilters = require('../actions/caseFilters');

var _caseFilters2 = _interopRequireDefault(_caseFilters);

var _CaseFilters = require('../components/CaseFilters');

var _CaseFilters2 = _interopRequireDefault(_CaseFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CaseFiltersContainer = function CaseFiltersContainer(_ref) {
  var replaceCondition = _ref.replaceCondition,
      addCondition = _ref.addCondition,
      removeCondition = _ref.removeCondition,
      changeConditionType = _ref.changeConditionType,
      changeWorkflowSelection = _ref.changeWorkflowSelection,
      changeCaseStateSelection = _ref.changeCaseStateSelection,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['replaceCondition', 'addCondition', 'removeCondition', 'changeConditionType', 'changeWorkflowSelection', 'changeCaseStateSelection']);
  return _react2.default.createElement(_CaseFilters2.default, (0, _extends3.default)({}, rest, {
    onReplace: replaceCondition,
    onRemove: removeCondition,
    onAdd: addCondition,
    onChangeType: changeConditionType,
    onChangeWorkflowSelection: changeWorkflowSelection,
    onChangeCaseStateSelection: changeCaseStateSelection
  }));
};

exports.default = (0, _reactRedux.connect)(undefined, function (dispatch, _ref2) {
  var reportId = _ref2.reportId;
  return (0, _redux.bindActionCreators)((0, _actions.bindReportId)(_caseFilters2.default, reportId), dispatch);
})(CaseFiltersContainer);


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/containers/CaseFilters.js