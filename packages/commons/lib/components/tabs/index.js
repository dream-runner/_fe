'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkHeaderTab = exports.LinkTab = exports.Tab = exports.TabBar = undefined;

var _ui = require('@signavio/ui');

Object.defineProperty(exports, 'TabBar', {
  enumerable: true,
  get: function get() {
    return _ui.TabBar;
  }
});
Object.defineProperty(exports, 'Tab', {
  enumerable: true,
  get: function get() {
    return _ui.Tab;
  }
});

var _LinkTab2 = require('./LinkTab');

var _LinkTab3 = _interopRequireDefault(_LinkTab2);

var _LinkHeaderTab2 = require('./LinkHeaderTab');

var _LinkHeaderTab3 = _interopRequireDefault(_LinkHeaderTab2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.LinkTab = _LinkTab3.default;
exports.LinkHeaderTab = _LinkHeaderTab3.default;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/tabs/index.js