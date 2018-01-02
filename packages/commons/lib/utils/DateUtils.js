'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDueMessage = getDueMessage;
exports.formatDueDate = formatDueDate;
exports.currentTimezone = currentTimezone;
exports.getDurationHumanized = getDurationHumanized;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _moment = require('../extensions/moment');

var _moment2 = _interopRequireDefault(_moment);

var _StringUtils = require('./StringUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDueMessage(date) {
  if (!date) {
    return;
  }

  var mom = (0, _moment2.default)(date);
  var interpolations = {
    fromNow: mom.fromNow({ withoutPastFuture: true, withoutTime: true })
  };

  if (mom.isSame((0, _moment2.default)(), 'day')) {
    return (0, _signavioI18n2.default)('Due today');
  }

  return (0, _StringUtils.capitalizeFirst)(mom.isAfter() ? (0, _signavioI18n2.default)('Due in __fromNow__', interpolations) : (0, _signavioI18n2.default)('__fromNow__ overdue', interpolations));
}

function formatDueDate(date) {
  if (!date) {
    return;
  }

  return (0, _moment2.default)(date).format('L');
}

// TODO: replace with momentjs version
function currentTimezone() {
  if (!window.Intl) {
    return;
  }

  return window.Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getDurationHumanized(date, anotherDate) {
  return _moment2.default.duration((0, _moment2.default)(date).diff(anotherDate)).humanize();
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/DateUtils.js