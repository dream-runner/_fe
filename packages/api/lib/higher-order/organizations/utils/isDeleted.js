'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDeleted;

var _name = require('./name');

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If the user object contains no name information it can be considered as deleted.
 */
function isDeleted(user) {
  return (0, _name2.default)(user).length === 0;
}


// WEBPACK FOOTER //
// ./packages/api/lib/higher-order/organizations/utils/isDeleted.js