'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRightsFromOverview;

var _computeOverview = require('./computeOverview');

var _computeOverview2 = _interopRequireDefault(_computeOverview);

var _getDummy = require('./getDummy');

var _getDummy2 = _interopRequireDefault(_getDummy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRightsFromOverview(access, rights, reference) {
  if (!access) {
    return (0, _getDummy2.default)(rights, true);
  }

  var overview = (0, _computeOverview2.default)(access);

  if (!overview[reference.id]) {
    return (0, _getDummy2.default)(rights, false);
  }

  return overview[reference.id];
}


// WEBPACK FOOTER //
// ./packages/access/lib/utils/getRightsFromOverview.js