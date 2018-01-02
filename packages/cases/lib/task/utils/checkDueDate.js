'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkDueDate;

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var SATURDAY = 6;

function checkDueDate(type, dueDate) {
  var now = (0, _extensions.moment)();
  var momentDueDate = (0, _extensions.moment)(dueDate);

  switch (type) {
    case 'overdue':
      return !momentDueDate.isSame(now, 'day') && momentDueDate.isBefore(now);
    case 'today':
      return momentDueDate.isSame(now, 'day');
    case 'thisweek':
      var currentWeek = now.week();
      var dueDateWeek = momentDueDate.week();

      var isSameWeek = momentDueDate.isSame(now, 'week');
      var isNextWeekSunday = dueDateWeek - currentWeek === 1 && momentDueDate.day() === 0;
      var isAfter = momentDueDate.isAfter(now);

      return !checkDueDate('today', dueDate) && isAfter && (isSameWeek || isNextWeekSunday);
    case 'later':
      var diffToSaturday = SATURDAY - now.day();
      var nextWeekMonday = now.add(diffToSaturday + 2, 'days').hour(0).minute(0).second(0);

      return momentDueDate.isSameOrAfter(nextWeekMonday);
    default:
      return false;
  }
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/checkDueDate.js