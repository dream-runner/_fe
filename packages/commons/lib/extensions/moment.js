'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _twix = require('twix');

var _twix2 = _interopRequireDefault(_twix);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _de = require('moment/locale/de');

var _de2 = _interopRequireDefault(_de);

var _fr = require('moment/locale/fr');

var _fr2 = _interopRequireDefault(_fr);

var _es = require('moment/locale/es');

var _es2 = _interopRequireDefault(_es);

var _enGb = require('moment/locale/en-gb');

var _enGb2 = _interopRequireDefault(_enGb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add timezone extension
var localeData = { de: _de2.default, fr: _fr2.default, es: _es2.default, en_gb: _enGb2.default

  // extend the moment locales to add support for calendar without time
};
/* eslint-enable */

/* eslint-disable */
//add twix as an extensions
var extendLocale = function extendLocale(lang) {
  _moment2.default.updateLocale(lang, (0, _extends3.default)({}, localeData[lang], {

    calendarOmitTime: {
      sameDay: function sameDay() {
        return (0, _signavioI18n2.default)('[Today]');
      },
      nextDay: function nextDay() {
        return (0, _signavioI18n2.default)('[Tomorrow]');
      },
      nextWeek: 'dddd',
      lastDay: function lastDay() {
        return (0, _signavioI18n2.default)('[Yesterday]');
      },
      lastWeek: function lastWeek() {
        return (0, _signavioI18n2.default)('[Last] dddd');
      },
      sameElse: 'L'
    },

    calendar: function calendar(key, mom, omitTime) {
      var output = this[omitTime ? '_calendarOmitTime' : '_calendar'][key];
      return typeof output === 'function' ? output.apply(mom) : output;
    }
  }));
};
(0, _lodash.keys)(localeData).concat(['en']).forEach(extendLocale);

// these locales are required to derive humanized durations without 'in' or 'ago' but in the
// same grammatical form that would be used for these
var createWithoutPastFutureLocale = function createWithoutPastFutureLocale(lang) {
  return _moment2.default.defineLocale(lang + '-withoutPastFuture', {
    parentLocale: '' + lang,
    relativeTime: {
      future: '%s',
      past: '%s'
    }
  });
};
(0, _lodash.keys)(localeData).concat(['en']).forEach(createWithoutPastFutureLocale);

var getFormat = function getFormat(diff) {
  if (diff < -6) {
    return 'sameElse';
  }

  if (diff < -1) {
    return 'lastWeek';
  }

  if (diff < 0) {
    return 'lastDay';
  }

  if (diff < 1) {
    return 'sameDay';
  }

  if (diff < 2) {
    return 'nextDay';
  }

  if (diff < 7) {
    return 'nextWeek';
  }

  return 'sameElse';
};

_moment2.default.fn.calendar = function calendar(omitTime) {
  var diff = omitTime ? this.clone().utc().startOf('day').diff((0, _moment2.default)().utc().startOf('day'), 'days', true) : this.diff((0, _moment2.default)().utcOffset(this.utcOffset()).startOf('day'), 'days', true);

  var format = getFormat(diff);

  return this.format(this.localeData().calendar(format, this, omitTime));
};

_moment2.default.fn.fromNow = function fromNow() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      withoutSuffix = _ref.withoutSuffix,
      withoutPastFuture = _ref.withoutPastFuture,
      withoutTime = _ref.withoutTime;

  var currentLocale = this.locale().split('_')[0];

  if (!withoutSuffix && withoutPastFuture) {
    // use the special locale with overrides of relativeTime.past and relativeTime.future
    this.locale(currentLocale + '-withoutPastFuture');
  }

  return withoutTime ? this.clone().utc().startOf('day').from((0, _moment2.default)().utc().startOf('day'), withoutSuffix) : this.from((0, _moment2.default)(), withoutSuffix);
};

_moment2.default.locale((0, _signavioI18n.locale)());

(0, _signavioI18n.onChangeLocale)(function () {
  _moment2.default.locale((0, _signavioI18n.locale)());
});

exports.default = _moment2.default;


// WEBPACK FOOTER //
// ./packages/commons/lib/extensions/moment.js