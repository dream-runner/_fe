'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRequest;

var _kraken = require('@signavio/kraken');

var _utils = require('@signavio/kraken/lib/utils');

function getRequest(store, entityType, query) {
  var requestId = (0, _utils.deriveRequestIdFromAction)({
    payload: {
      entityType: entityType,
      query: query
    },
    type: _kraken.actionTypes.FETCH_DISPATCH
  });

  var requests = store.getState().kraken.requests[entityType];

  if (!requests) {
    return null;
  }

  return requests[requestId];
}


// WEBPACK FOOTER //
// ./packages/api/lib/mockUtils/getRequest.js