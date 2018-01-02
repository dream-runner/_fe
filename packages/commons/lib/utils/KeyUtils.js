'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEsc = exports.isArrowUp = exports.isArrowDown = exports.isEnter = exports.esc = exports.arrowUp = exports.arrowDown = exports.enter = undefined;

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getKeyCode = function getKeyCode(value) {
  return (0, _isNumber2.default)(value) ? value : value.keyCode;
};

var enter = exports.enter = function enter() {
  return 13;
};
var arrowDown = exports.arrowDown = function arrowDown() {
  return 40;
};
var arrowUp = exports.arrowUp = function arrowUp() {
  return 38;
};
var esc = exports.esc = function esc() {
  return 27;
};

var isEnter = exports.isEnter = function isEnter(value) {
  return getKeyCode(value) === 13;
};
var isArrowDown = exports.isArrowDown = function isArrowDown(value) {
  return getKeyCode(value) === 40;
};
var isArrowUp = exports.isArrowUp = function isArrowUp(value) {
  return getKeyCode(value) === 38;
};
var isEsc = exports.isEsc = function isEsc(value) {
  return getKeyCode(value) === 27;
};


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/KeyUtils.js