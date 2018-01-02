'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Col = exports.Row = exports.Clearfix = exports.Grid = undefined;

var _reactBootstrap = require('react-bootstrap');

Object.defineProperty(exports, 'Grid', {
  enumerable: true,
  get: function get() {
    return _reactBootstrap.Grid;
  }
});
Object.defineProperty(exports, 'Clearfix', {
  enumerable: true,
  get: function get() {
    return _reactBootstrap.Clearfix;
  }
});

var _Row2 = require('./Row');

var _Row3 = _interopRequireDefault(_Row2);

var _Col2 = require('./Col');

var _Col3 = _interopRequireDefault(_Col2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Row = _Row3.default;
exports.Col = _Col3.default;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/grid/index.js