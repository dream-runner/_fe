"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var intervals = {};

var log10 = exports.log10 = Math.log10 || function (value) {
  return Math.log(value) / Math.LN10;
};

var create = exports.create = function create(name) {
  intervals[name] = null;

  return {
    perform: function perform(action) {
      var createInterval = function createInterval(amount, multiplier) {
        var counter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        intervals[name] = setTimeout(function () {
          var timestamp = createInterval(amount, multiplier, counter + 1);

          action(timestamp);
        }, amount * multiplier * (3 * log10(counter) + 1));

        return intervals[name];
      };

      return {
        milliseconds: function milliseconds(amount) {
          return createInterval(amount, 1);
        },
        seconds: function seconds(amount) {
          return createInterval(amount, 1000);
        },
        minutes: function minutes(amount) {
          return createInterval(amount, 1000 * 60);
        }
      };
    }
  };
};

var stop = exports.stop = function stop(name) {
  if (!intervals[name]) {
    return;
  }

  clearTimeout(intervals[name]);
};


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/TimeUtils.js