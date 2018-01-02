'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = getDummy;

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDummy(availableRights) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return (0, _lodash.reduce)(availableRights, function (result, right) {
    return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, right, defaultValue));
  }, {});
}


// WEBPACK FOOTER //
// ./packages/access/lib/utils/getDummy.js