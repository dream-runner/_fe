'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = grantRights;

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function grantRights(access, rights, reference) {
  return (0, _lodash.merge)({}, access, (0, _lodash.reduce)(rights, function (result, right) {
    return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, right, (0, _lodash.unionBy)(access[right], [reference], 'id')));
  }, {}));
}


// WEBPACK FOOTER //
// ./packages/access/lib/utils/grantRights.js