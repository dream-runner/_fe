'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCustomCondition = exports.getSelectedWorkflow = exports.getSelectedCaseState = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _redux = require('redux');

var _reducerUtils = require('../../utils/reducerUtils');

var _lodash = require('lodash');

var _splice = require('../utils/splice');

var _splice2 = _interopRequireDefault(_splice);

var _caseFilters = require('../actions/caseFilters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customConditionTypeReducer = function customConditionTypeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'and';
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;
  return type === _caseFilters.CONDITION_TYPE_CHANGE ? payload.newType : state;
};

var customConditionsReducer = function customConditionsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref2 = arguments[1];
  var type = _ref2.type,
      payload = _ref2.payload;

  switch (type) {
    case _caseFilters.CONDITION_REPLACE:
      return (0, _splice2.default)(state, payload.index, 1, payload.newCondition);
    case _caseFilters.CONDITION_REMOVE:
      return (0, _splice2.default)(state, payload.index, 1);
    case _caseFilters.CONDITION_ADD:
      return [].concat((0, _toConsumableArray3.default)(state), [{ left: {}, type: 'equals', right: {} }]);
    case _caseFilters.CONDITION_CHANGE_WORKFLOW_SELECTION:
      return state.filter(function (_ref3) {
        var left = _ref3.left,
            right = _ref3.right;
        return (!left.expression || left.expression.split('.')[0] === 'case') && (!right.expression || right.expression.split('.')[0] === 'case');
      });
    default:
      return state;
  }
};

var caseStateFilterReducer = function caseStateFilterReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'unspecified';
  var _ref4 = arguments[1];
  var type = _ref4.type,
      payload = _ref4.payload;

  if (type === _caseFilters.CONDITION_CHANGE_CASE_STATE_SELECTION) {
    if (payload.caseState === 'ALL') return 'unspecified';
    if (payload.caseState === 'OPEN') return 'isFalse';
    if (payload.caseState === 'CLOSED') return 'isTrue';
  }

  return state;
};

var workflowFilterReducer = function workflowFilterReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var _ref5 = arguments[1];
  var type = _ref5.type,
      payload = _ref5.payload;

  if (type === _caseFilters.CONDITION_CHANGE_WORKFLOW_SELECTION) {
    return payload.workflowId;
  }

  return state;
};

exports.default = (0, _redux.combineReducers)({
  type: function type() {
    return 'and';
  },
  conditions: (0, _reducerUtils.combineReducersArray)([(0, _redux.combineReducers)({
    left: (0, _redux.combineReducers)({ expression: function expression() {
        return 'case.closed';
      } }),
    type: caseStateFilterReducer
  }), (0, _redux.combineReducers)({
    left: (0, _redux.combineReducers)({ expression: function expression() {
        return 'case.sourceWorkflowId';
      } }),
    type: function type() {
      return 'equals';
    },
    right: (0, _redux.combineReducers)({ value: workflowFilterReducer })
  }), (0, _redux.combineReducers)({
    type: customConditionTypeReducer,
    conditions: customConditionsReducer
  })])
});
var getSelectedCaseState = exports.getSelectedCaseState = function getSelectedCaseState(_ref6) {
  var conditions = _ref6.conditions;
  return conditions[0].type && { isTrue: 'CLOSED', isFalse: 'OPEN' }[conditions[0].type];
};

var getSelectedWorkflow = exports.getSelectedWorkflow = function getSelectedWorkflow(_ref7) {
  var conditions = _ref7.conditions;
  return conditions[1].right.value;
};

var getCustomCondition = exports.getCustomCondition = function getCustomCondition(_ref8) {
  var conditions = _ref8.conditions;

  var filterConditions = conditions[2];

  return (0, _extends3.default)({}, filterConditions, {
    conditions: (0, _lodash.map)(filterConditions.conditions, function (condition) {
      return (0, _extends3.default)({}, condition, {
        right: condition.right || {}
      });
    })
  });
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/reducers/whereReducer.js