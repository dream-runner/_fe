'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTile = exports.makeInteractive = exports.PlaceholderTile = exports.TextTile = exports.Tile = undefined;

var _ui = require('@signavio/ui');

Object.defineProperty(exports, 'Tile', {
  enumerable: true,
  get: function get() {
    return _ui.Tile;
  }
});
Object.defineProperty(exports, 'TextTile', {
  enumerable: true,
  get: function get() {
    return _ui.TextTile;
  }
});
Object.defineProperty(exports, 'PlaceholderTile', {
  enumerable: true,
  get: function get() {
    return _ui.PlaceholderTile;
  }
});
Object.defineProperty(exports, 'makeInteractive', {
  enumerable: true,
  get: function get() {
    return _ui.makeInteractive;
  }
});

var _ActionTile2 = require('./ActionTile');

var _ActionTile3 = _interopRequireDefault(_ActionTile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ActionTile = _ActionTile3.default;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/tiles/index.js