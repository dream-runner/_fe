'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = exports.HintWithIcon = exports.Hint = undefined;

var _ui = require('@signavio/ui');

Object.defineProperty(exports, 'Hint', {
  enumerable: true,
  get: function get() {
    return _ui.Hint;
  }
});
Object.defineProperty(exports, 'HintWithIcon', {
  enumerable: true,
  get: function get() {
    return _ui.HintWithIcon;
  }
});

var _Alert2 = require('./Alert');

var _Alert3 = _interopRequireDefault(_Alert2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Alert = _Alert3.default;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/hints/index.js