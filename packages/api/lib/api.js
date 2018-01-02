'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.connect = exports.saga = exports.reducer = undefined;

var _kraken = require('@signavio/kraken');

var _kraken2 = _interopRequireDefault(_kraken);

var _types = require('./types');

var apiTypes = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _creator = (0, _kraken2.default)(apiTypes),
    reducer = _creator.reducer,
    saga = _creator.saga,
    connect = _creator.connect,
    actions = _creator.actions;

exports.reducer = reducer;
exports.saga = saga;
exports.connect = connect;
exports.actions = actions;


// WEBPACK FOOTER //
// ./packages/api/lib/api.js