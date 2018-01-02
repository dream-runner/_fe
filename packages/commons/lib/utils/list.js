'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.replace = replace;
exports.insertAtIndex = insertAtIndex;
exports.createFindById = createFindById;

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function replace(list, item, predicate) {
  var index = (0, _lodash.findIndex)(list, predicate);

  return [].concat((0, _toConsumableArray3.default)(list.slice(0, index)), [item], (0, _toConsumableArray3.default)(list.slice(index + 1)));
}
function insertAtIndex(list, item, index) {
  if ((0, _lodash.isUndefined)(index)) {
    return [].concat((0, _toConsumableArray3.default)(list), [item]);
  }

  return [].concat((0, _toConsumableArray3.default)(list.slice(0, index)), [item], (0, _toConsumableArray3.default)(list.slice(index)));
}

function createFindById(item) {
  return function (_ref) {
    var id = _ref.id;
    return id === item.id;
  };
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/list.js