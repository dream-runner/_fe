'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'invites';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var create = exports.create = function create(_ref) {
  var email = _ref.email,
      id = _ref.id,
      admin = _ref.admin;
  return admin ? (0, _callApi.callAdminApi)('admin/organizations/' + id + '/invitations/' + email + '/resend', schema, { method: 'POST' }) : (0, _callApi2.default)('invitations/' + email + '/resend', schema, { method: 'POST' });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/organizations/resendInvite.js