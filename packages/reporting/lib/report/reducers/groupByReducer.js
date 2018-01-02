'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = groupByReducer;

var _groupBy = require('../actions/groupBy');

var _caseFilters = require('../actions/caseFilters');

var _reorder = require('../utils/reorder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function groupByReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _groupBy.GROUP_BY_ADD:
      return [].concat((0, _toConsumableArray3.default)(state), [payload.binding]);
    case _groupBy.GROUP_BY_REMOVE:
      return [].concat((0, _toConsumableArray3.default)(state.slice(0, payload.index)), (0, _toConsumableArray3.default)(state.slice(payload.index + 1)));
    case _groupBy.GROUP_BY_REORDER:
      return (0, _reorder.reorder)(state, payload.indices);
    case _caseFilters.CONDITION_CHANGE_WORKFLOW_SELECTION:
      return state.filter(function (binding) {
        return binding.expression.split('.')[0] === 'case';
      });
    default:
      return state;
  }
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/reducers/groupByReducer.js