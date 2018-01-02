'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wipe;

var _api = require('../api');

function wipe(store) {
  store.dispatch(_api.actions.wipe());
}


// WEBPACK FOOTER //
// ./packages/api/lib/mockUtils/wipe.js