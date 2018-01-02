'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cachePolicy = exports.remove = exports.create = exports.collection = undefined;

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

var _user = require('./user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'users';

var create = exports.create = function create(_ref) {
  var groupId = _ref.groupId,
      userId = _ref.userId;
  return (0, _callApi2.default)('groups/' + groupId + '/members', _user.schema, {
    method: 'POST',
    body: { id: userId }
  });
};

var remove = exports.remove = function remove(_ref2) {
  var groupId = _ref2.groupId,
      userId = _ref2.userId;
  return (0, _callApi2.default)('groups/' + groupId + '/members/' + userId, _user.schema, { method: 'DELETE' });
};

// disable optimisticRemove cache policy (which is the default)
// as we do not want to remove users when removing groupMembers
var cachePolicy = exports.cachePolicy = {};


// WEBPACK FOOTER //
// ./packages/api/lib/types/users/groupMember.js