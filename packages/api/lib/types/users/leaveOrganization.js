'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.schema = exports.collection = undefined;

var _user = require('./user');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _user.collection;
  }
});
Object.defineProperty(exports, 'schema', {
  enumerable: true,
  get: function get() {
    return _user.schema;
  }
});

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = exports.create = function create(_ref) {
  var userId = _ref.userId,
      organizationId = _ref.organizationId;
  return (0, _callApi2.default)('users/' + userId + '/leave', _user.schema, {
    method: 'POST',
    body: {
      organizationId: organizationId
    }
  });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/users/leaveOrganization.js