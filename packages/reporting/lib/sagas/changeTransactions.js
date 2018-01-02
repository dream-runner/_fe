'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = getChangeTransaction;

var _effects = require('redux-saga/effects');

var _effektifApi = require('@signavio/effektif-api');

var _caseFilters = require('../report/actions/caseFilters');

var _report = require('../report/actions/report');

var _report2 = _interopRequireDefault(_report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(workflowChangeTransaction);

var dispatchFetch = _effektifApi.actions.dispatchFetch;


function workflowChangeTransaction(_ref, getWorkflow) {
  var payload = _ref.payload;

  var fetchWorkflowAction, requestId, _ref2, success, failure, workflowId;

  return _regenerator2.default.wrap(function workflowChangeTransaction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 1. retrieve workflow
          fetchWorkflowAction = dispatchFetch({
            entityType: _effektifApi.types.WORKFLOW,
            query: { id: payload.workflowId }
            // requiredFields: ['caseColumns'],
          });
          _context.next = 3;
          return (0, _effects.put)(fetchWorkflowAction);

        case 3:
          requestId = (0, _effektifApi.deriveRequestIdFromAction)(fetchWorkflowAction);
          _context.next = 6;
          return (0, _effects.race)({
            success: (0, _effects.take)(function (action) {
              return action.type === _effektifApi.actionTypes.FETCH_SUCCESS && (0, _effektifApi.deriveRequestIdFromAction)(action) === requestId;
            }),
            failure: (0, _effects.take)(function (action) {
              return action.type === _effektifApi.actionTypes.FETCH_FAILURE && (0, _effektifApi.deriveRequestIdFromAction)(action) === requestId;
            })
          });

        case 6:
          _ref2 = _context.sent;
          success = _ref2.success;
          failure = _ref2.failure;

          if (!failure) {
            _context.next = 11;
            break;
          }

          throw new Error('Could not finish workflow change transaction:\n' + failure.payload.error);

        case 11:
          workflowId = success.payload.value;

          // 2. now that we have the workflow data, we can initialize some defaults in the report
          // that are specific to this workflow

          _context.next = 14;
          return (0, _effects.put)(_report2.default.initDefaultsForWorkflow(payload.reportId, getWorkflow(workflowId)));

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

var bindAction = function bindAction(generatorFunction, action) {
  return (/*#__PURE__*/_regenerator2.default.mark(function boundGeneratorFunction() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _regenerator2.default.wrap(function boundGeneratorFunction$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return generatorFunction.apply(undefined, [action].concat(args));

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, boundGeneratorFunction, this);
    })
  );
};

function getChangeTransaction(action) {
  var transaction = void 0;
  switch (action.type) {
    case _caseFilters.CONDITION_CHANGE_WORKFLOW_SELECTION:
      transaction = workflowChangeTransaction;
      break;
    default:
      transaction = null;
  }

  return transaction && bindAction(transaction, action);
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/sagas/changeTransactions.js