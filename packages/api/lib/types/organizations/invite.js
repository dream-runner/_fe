'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.create = exports.schema = exports.collection = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'invites';

var schema = exports.schema = new _normalizr.schema.Entity(collection, {}, { idAttribute: 'emailAddress' });

var create = function create(_ref) {
  var id = _ref.id,
      admin = _ref.admin,
      body = (0, _objectWithoutProperties3.default)(_ref, ['id', 'admin']);
  return admin ? (0, _callApi.callAdminApi)('admin/organizations/' + id + '/invitations', schema, {
    method: 'POST',
    body: body
  }) : (0, _callApi2.default)('users', schema, { method: 'POST', body: body });
};

exports.create = create;
var remove = exports.remove = function remove(_ref2, emailAddress) {
  var id = _ref2.id,
      admin = _ref2.admin;
  return admin ? (0, _callApi.callAdminApi)('admin/organizations/' + id + '/invitations/' + emailAddress, schema, { method: 'DELETE' }) : (0, _callApi2.default)('invitations/' + emailAddress, schema, { method: 'DELETE' });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/organizations/invite.js