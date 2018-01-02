'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eachOnce = eachOnce;

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function eachOnce(obj, events, handler, ctx) {
  var handlerArgs;
  var pendingItemHandlers = {};

  (0, _each2.default)(events, function (ev) {
    var itemHandler = function () {
      if (events.indexOf(ev) === 0) {
        handlerArgs = arguments;
      }
      delete pendingItemHandlers[ev];
      if ((0, _isEmpty2.default)(pendingItemHandlers)) {
        handler.apply(this, handlerArgs);
      }
    }.bind(ctx || obj);

    pendingItemHandlers[ev] = itemHandler;
    obj.once(ev, itemHandler);
  });

  return {
    off: function off() {
      (0, _each2.default)(pendingItemHandlers, function (itemHandler, ev) {
        obj.off(ev, itemHandler);
      });
    }
  };
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/EventUtils.js