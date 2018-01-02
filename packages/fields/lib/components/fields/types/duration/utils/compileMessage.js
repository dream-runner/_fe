'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = compileMessage;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function collectParts(value, units) {
  var unit = (0, _lodash.first)(units);

  if (!unit || value === 0) {
    return [];
  }

  var fit = Math.floor(value / unit.duration);

  if (fit) {
    return [unit.message(fit)].concat((0, _toConsumableArray3.default)(collectParts(value - fit * unit.duration, units.slice(1))));
  }

  return collectParts(value - fit * unit.duration, units.slice(1));
}

function compileMessage(value, units) {
  var parts = collectParts(value, units);

  if (parts.length === 0) {
    return (0, _signavioI18n2.default)('< 1 minute');
  }

  if (parts.length === 1) {
    return (0, _lodash.first)(parts);
  }

  var start = parts.slice(0, parts.length - 1);

  return (0, _signavioI18n2.default)('__first__ and __last__', {
    context: 'This represents a duration where `first` represents the main part of the duration and `last` the last part, i.e. 3 days, 1 hour and 2 minutes.',
    first: start.join(', '),
    last: (0, _lodash.last)(parts)
  });
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/duration/utils/compileMessage.js