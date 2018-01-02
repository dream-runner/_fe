'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Colors = undefined;
exports.priorities = priorities;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function priorities() {
  return [{
    id: '0',
    name: (0, _signavioI18n2.default)('High')
  }, {
    id: '1',
    name: (0, _signavioI18n2.default)('Medium')
  }, {
    id: '2',
    name: (0, _signavioI18n2.default)('Normal')
  }, {
    id: '3',
    name: (0, _signavioI18n2.default)('Low')
  }];
}

var Colors = exports.Colors = {
  high: '#ea86a7',
  medium: '#ead586',
  normal: '#8eea86',
  low: '#86e5ea'
};


// WEBPACK FOOTER //
// ./packages/cases/lib/components/priority/priorities.js