'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFeedbackOptions;

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFeedbackOptions() {
  return [{
    id: 'question',
    value: (0, _signavioI18n2.default)('I have a question')
  }, {
    id: 'error',
    value: (0, _signavioI18n2.default)("Something didn't work as I expected")
  }, {
    id: 'feature',
    value: (0, _signavioI18n2.default)("I'm missing a feature")
  }, {
    id: 'support',
    value: (0, _signavioI18n2.default)('I need help with a certain feature')
  }, {
    id: 'kudos',
    value: (0, _signavioI18n2.default)('Kudos')
  }];
}


// WEBPACK FOOTER //
// ./packages/api/lib/components/feedback/getFeedbackOptions.js