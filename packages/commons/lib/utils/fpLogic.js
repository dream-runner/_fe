'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.not = exports.passesSome = exports.passesEvery = undefined;

var _lodash = require('lodash');

var passesEvery = exports.passesEvery = function passesEvery() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (0, _lodash.every)(functions, function (fn) {
      return fn.apply(undefined, args);
    });
  };
};

var passesSome = exports.passesSome = function passesSome() {
  for (var _len3 = arguments.length, functions = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    functions[_key3] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return (0, _lodash.some)(functions, function (fn) {
      return fn.apply(undefined, args);
    });
  };
};

var not = exports.not = function not(fn) {
  return function () {
    return !fn.apply(undefined, arguments);
  };
};


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/fpLogic.js