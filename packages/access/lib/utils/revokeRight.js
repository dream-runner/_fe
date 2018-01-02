'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = revokeRights;

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function revokeRights(access, right, reference) {
  if (!access[right]) {
    return access;
  }

  return (0, _extends4.default)({}, access, (0, _defineProperty3.default)({}, right, (0, _lodash.reject)(access[right], reference)));
}


// WEBPACK FOOTER //
// ./packages/access/lib/utils/revokeRight.js