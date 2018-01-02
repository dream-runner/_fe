'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.default = unique;

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// returns a string value for the `propertyName` property that is unique across all items in `array`
function unique(array, propertyName) {
  var i = (0, _lodash.uniqueId)();
  while ((0, _lodash.find)(array, (0, _defineProperty3.default)({}, propertyName, '' + i))) {
    i = (0, _lodash.uniqueId)();
  }return '' + i;
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/utils/unique.js