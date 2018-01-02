'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.collection = undefined;

var _user = require('./user');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _user.collection;
  }
});

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = exports.create = function create(_ref) {
  var id = _ref.id,
      replaceUserId = _ref.replaceUserId;
  return (0, _callApi2.default)('users/' + id + '/delete', _user.schema, {
    method: 'POST',
    body: { replaceUserId: replaceUserId }
  });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/users/userRemove.js