'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reorder;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// returns a reordered version of `array` based on the order of `indices`
function reorder(array, indices) {
  (0, _invariant2.default)(array.length === indices.length, 'The array to reorder and the indices must have the same length');
  var result = [];
  for (var i = 0, l = array.length; i < l; ++i) {
    var index = indices[i];
    (0, _invariant2.default)(index >= 0 && index < l, 'Got invalid index: ' + index);
    result[i] = array[index];
  }
  return result;
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/utils/reorder.js