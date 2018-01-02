'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _license = require('./license');

Object.defineProperty(exports, 'collection', {
  enumerable: true,
  get: function get() {
    return _license.collection;
  }
});

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = exports.schema = new _normalizr.schema.Array(_license.schema);

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id,
      admin = _ref.admin;

  if (admin) {
    return (0, _callApi.callAdminApi)('admin/organizations/' + id + '/licenses', schema);
  }
  return (0, _callApi2.default)('info/licenses', schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/organizations/licenses.js