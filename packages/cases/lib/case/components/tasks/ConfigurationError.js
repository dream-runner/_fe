'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _ErrorTask = require('./ErrorTask');

var _ErrorTask2 = _interopRequireDefault(_ErrorTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.withProps)(function () {
  return {
    subtitle: (0, _signavioI18n2.default)('Configuration invalid')
  };
})(_ErrorTask2.default);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/tasks/ConfigurationError.js