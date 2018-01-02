'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'userPreferences';

var schema = exports.schema = new _normalizr.schema.Entity(collection);

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id;
  return (0, _callApi2.default)('users/' + id + '/preferences', schema);
};

var update = exports.update = function update(_ref2, body) {
  var id = _ref2.id;
  return (0, _callApi2.default)('users/' + id + '/preferences', schema, { method: 'PUT', body: body });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/users/userPreference.js