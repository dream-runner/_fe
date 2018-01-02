'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = root;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _effektifApi = require('@signavio/effektif-api');

var _report = require('../report/actions/report');

var _report2 = _interopRequireDefault(_report);

var _changeTransactions = require('./changeTransactions');

var _changeTransactions2 = _interopRequireDefault(_changeTransactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(delayedReportUpdate),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(watchReportChanges),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(loadReport),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(watchLoadReport),
    _marked5 = /*#__PURE__*/_regenerator2.default.mark(root);

var dispatchFetch = _effektifApi.actions.dispatchFetch,
    dispatchUpdate = _effektifApi.actions.dispatchUpdate;


function delayedReportUpdate(body) {
  var updateAction, requestId, _ref, success, failure;

  return _regenerator2.default.wrap(function delayedReportUpdate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.call)(_reduxSaga.delay, 2000);

        case 2:
          _context.next = 4;
          return (0, _effects.put)(_report2.default.saveReport(body.id));

        case 4:
          updateAction = dispatchUpdate({
            entityType: _effektifApi.types.REPORT,
            query: { id: body.id },
            body: body
          });
          _context.next = 7;
          return (0, _effects.put)(updateAction);

        case 7:
          requestId = (0, _effektifApi.deriveRequestIdFromAction)(updateAction);
          _context.next = 10;
          return (0, _effects.race)({
            success: (0, _effects.take)(function (action) {
              return action.type === _effektifApi.actionTypes.UPDATE_SUCCESS && action.payload.requestId === requestId;
            }),
            failure: (0, _effects.take)(function (action) {
              return action.type === _effektifApi.actionTypes.UPDATE_FAILURE && action.payload.requestId === requestId;
            })
          });

        case 10:
          _ref = _context.sent;
          success = _ref.success;
          failure = _ref.failure;

          if (!success) {
            _context.next = 16;
            break;
          }

          _context.next = 16;
          return (0, _effects.put)(_report2.default.saveReportSuccess(body.id, success.payload.entities.reports[body.id]));

        case 16:
          if (!failure) {
            _context.next = 19;
            break;
          }

          _context.next = 19;
          return (0, _effects.put)(_report2.default.saveReportFailure(body.id, failure.payload.error));

        case 19:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function watchReportChanges(reportId, getWorkflow) {
  var selectReportState, updateTask, previousReportState, action, changeTransaction, reportState;
  return _regenerator2.default.wrap(function watchReportChanges$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          selectReportState = _effects.select.bind(null, function (state) {
            return state.reporting.reports[reportId].report;
          });
          updateTask = void 0;

        case 2:
          if (!true) {
            _context2.next = 30;
            break;
          }

          _context2.next = 5;
          return selectReportState();

        case 5:
          previousReportState = _context2.sent;
          _context2.next = 8;
          return (0, _effects.take)('*');

        case 8:
          action = _context2.sent;

          if (!(action.payload.reportId !== reportId)) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt('continue', 2);

        case 11:

          // check if there are side-effect to this change that must happen in a transaction
          // before the report is valid for save again
          changeTransaction = (0, _changeTransactions2.default)(action);

          if (!changeTransaction) {
            _context2.next = 18;
            break;
          }

          if (!updateTask) {
            _context2.next = 16;
            break;
          }

          _context2.next = 16;
          return (0, _effects.cancel)(updateTask);

        case 16:
          _context2.next = 18;
          return (0, _effects.call)(changeTransaction, getWorkflow);

        case 18:
          _context2.next = 20;
          return selectReportState();

        case 20:
          reportState = _context2.sent;

          if (!(reportState !== previousReportState)) {
            _context2.next = 28;
            break;
          }

          if (!updateTask) {
            _context2.next = 25;
            break;
          }

          _context2.next = 25;
          return (0, _effects.cancel)(updateTask);

        case 25:
          _context2.next = 27;
          return (0, _effects.spawn)(delayedReportUpdate, reportState);

        case 27:
          updateTask = _context2.sent;

        case 28:
          _context2.next = 2;
          break;

        case 30:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function loadReport(getWorkflow, _ref2) {
  var query = _ref2.payload.query;

  var dispatchFetchAction, requestId, _ref3, success, failure;

  return _regenerator2.default.wrap(function loadReport$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          dispatchFetchAction = dispatchFetch({
            entityType: _effektifApi.types.REPORT,
            query: query,
            refresh: true
          });
          _context3.next = 3;
          return (0, _effects.put)(dispatchFetchAction);

        case 3:
          requestId = (0, _effektifApi.deriveRequestIdFromAction)(dispatchFetchAction);
          _context3.next = 6;
          return (0, _effects.race)({
            success: (0, _effects.take)(function (action) {
              return action.type === _effektifApi.actionTypes.FETCH_SUCCESS && action.payload.requestId === requestId;
            }),
            failure: (0, _effects.take)(function (action) {
              return action.type === _effektifApi.actionTypes.FETCH_FAILURE && action.payload.requestId === requestId;
            })
          });

        case 6:
          _ref3 = _context3.sent;
          success = _ref3.success;
          failure = _ref3.failure;

          if (!success) {
            _context3.next = 14;
            break;
          }

          _context3.next = 12;
          return (0, _effects.put)(_report2.default.loadReportSuccess(query, success.payload.entities.reports[query.id]));

        case 12:
          _context3.next = 14;
          return (0, _effects.fork)(watchReportChanges, query.id, getWorkflow);

        case 14:
          if (!failure) {
            _context3.next = 19;
            break;
          }

          _context3.next = 17;
          return (0, _effects.put)(_report2.default.loadReportFailure(query, failure.payload.error));

        case 17:
          _context3.next = 19;
          return (0, _effects.put)((0, _reactRouterRedux.push)((0, _effektifApi.prependOrg)('/analytics/dashboard')));

        case 19:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

// Fetches data for a Report: report data + results
function watchLoadReport(getWorkflow) {
  return _regenerator2.default.wrap(function watchLoadReport$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _reduxSaga.takeLatest)(_report.REPORT_LOAD, loadReport, getWorkflow);

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function root(getState) {
  var getWorkflow;
  return _regenerator2.default.wrap(function root$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          getWorkflow = function getWorkflow(id) {
            return getState().kraken.entities.workflows[id];
          };

          _context5.next = 3;
          return (0, _effects.fork)(watchLoadReport, getWorkflow);

        case 3:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked5, this);
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/sagas/index.js