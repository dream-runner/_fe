'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = getRights;

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRights(access) {
  if (!access) {
    for (var _len = arguments.length, rights = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rights[_key - 1] = arguments[_key];
    }

    return (0, _lodash.reduce)(rights, function (result, right) {
      return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, right, true));
    }, {});
  }

  return access;
}


// WEBPACK FOOTER //
// ./packages/access/lib/utils/getRights.js