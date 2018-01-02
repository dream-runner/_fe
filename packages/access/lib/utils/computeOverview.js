'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

exports.default = computeOverview;

var _lodash = require('lodash');

var _getDummy = require('./getDummy');

var _getDummy2 = _interopRequireDefault(_getDummy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function computeOverview(access) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var availableRights = options.availableRights,
      targetType = options.targetType;


  var entries = (0, _lodash.reduce)(access, function (result, acl, right) {
    return (0, _extends5.default)({}, result, (0, _defineProperty3.default)({}, right, (0, _lodash.reduce)(acl, function (ids, _ref) {
      var id = _ref.id,
          type = _ref.type;

      if (targetType && type !== targetType) {
        return ids;
      }

      return [].concat((0, _toConsumableArray3.default)(ids), [id]);
    }, [])));
  }, {});

  var overview = {};

  (0, _lodash.each)(entries, function (ids, right) {
    (0, _lodash.each)(ids, function (id) {
      if (!overview[id]) {
        overview[id] = (0, _getDummy2.default)((0, _lodash.union)(availableRights, (0, _lodash.keys)(access)), false);
      }

      overview[id] = (0, _extends5.default)({}, overview[id], (0, _defineProperty3.default)({}, right, true));
    });
  });

  return overview;
}


// WEBPACK FOOTER //
// ./packages/access/lib/utils/computeOverview.js