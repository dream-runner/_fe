'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormatForKind = getFormatForKind;
exports.getNoValueMessageForKind = getNoValueMessageForKind;
exports.getComponentForKind = getComponentForKind;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatForKind = {
  date: 'LL',
  time: 'LT',
  datetime: 'LLL'
};

function getFormatForKind(kind) {
  return formatForKind[kind];
}

var noValueMsgForKind = function noValueMsgForKind(kind) {
  return {
    date: (0, _signavioI18n2.default)('No date set'),
    time: (0, _signavioI18n2.default)('No time set'),
    datetime: (0, _signavioI18n2.default)('No date & time set')
  }[kind];
};

function getNoValueMessageForKind(kind) {
  return noValueMsgForKind(kind);
}

var componentForKind = {
  date: _components.DateInput,
  time: _components.TimeInput,
  datetime: _components.DateTimeInput
};

function getComponentForKind(kind) {
  return componentForKind[kind];
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/date/utils.js