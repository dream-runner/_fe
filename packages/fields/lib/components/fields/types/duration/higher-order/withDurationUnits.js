'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;

var units = function units() {
  return [{
    key: 'weeks',
    duration: week,
    message: function message(count) {
      return (0, _signavioI18n2.default)('__count__ week', '__count__ weeks', { count: count });
    },
    title: (0, _signavioI18n2.default)('weeks')
  }, {
    key: 'days',
    duration: day,
    message: function message(count) {
      return (0, _signavioI18n2.default)('__count__ day', '__count__ days', { count: count });
    },
    title: (0, _signavioI18n2.default)('days')
  }, {
    key: 'hours',
    duration: hour,
    message: function message(count) {
      return (0, _signavioI18n2.default)('__count__ hour', '__count__ hours', { count: count });
    },
    title: (0, _signavioI18n2.default)('hours')
  }, {
    key: 'minutes',
    duration: minute,
    message: function message(count) {
      return (0, _signavioI18n2.default)('__count__ minute', '__count__ minutes', { count: count });
    },
    title: (0, _signavioI18n2.default)('minutes')
  }];
};

exports.default = (0, _recompose.withProps)(function () {
  return {
    units: units()
  };
});


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/duration/higher-order/withDurationUnits.js