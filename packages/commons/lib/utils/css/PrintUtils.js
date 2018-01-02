'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.off = off;
exports.onbeforeprint = onbeforeprint;
exports.offbeforeprint = offbeforeprint;
exports.onafterprint = onafterprint;
exports.offafterprint = offafterprint;

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _without = require('lodash/without');

var _without2 = _interopRequireDefault(_without);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CALLBACKS = {
  before: [],
  after: []
};

window.onbeforeprint = function () {
  (0, _each2.default)(CALLBACKS.before, function (listener) {
    listener.fn.call(listener.ctx);
  });
};

window.onafterprint = function () {
  (0, _each2.default)(CALLBACKS.after, function (listener) {
    listener.fn.call(listener.ctx);
  });
};

function on(name, clb, ctx) {
  if (!this['on' + name]) {
    return;
  }

  this['on' + name](clb, ctx);
}
function off(name, clb, ctx) {
  if (!this['off' + name]) {
    return;
  }

  this['off' + name](clb, ctx);
}
function onbeforeprint(clb, ctx) {
  if ((0, _includes2.default)(CALLBACKS.before, clb)) {
    return;
  }

  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function (mql) {
      if (!mql.matches) {
        return;
      }

      clb.call(ctx);
    });
  }

  CALLBACKS.before.push({
    fn: clb,
    ctx: ctx
  });
}
function offbeforeprint(clb, ctx) {
  var listener = (0, _find2.default)(CALLBACKS.before, function (listener) {
    return listener.fn === clb && (ctx ? listener.ctx === ctx : true);
  });

  CALLBACKS.before = (0, _without2.default)(CALLBACKS.before, listener);
}
function onafterprint(clb, ctx) {
  if ((0, _includes2.default)(CALLBACKS.after, clb)) {
    return;
  }

  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {
        return;
      }

      clb.call(ctx);
    });
  }

  CALLBACKS.after.push({
    fn: clb,
    ctx: ctx
  });
}
function offafterprint(clb, ctx) {
  var listener = (0, _find2.default)(CALLBACKS.after, function (listener) {
    return listener.fn === clb && (ctx ? listener.ctx === ctx : true);
  });

  CALLBACKS.after = (0, _without2.default)(CALLBACKS.after, listener);
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/css/PrintUtils.js