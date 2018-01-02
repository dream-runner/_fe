'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'dynamicOptions';

var schema = exports.schema = new _normalizr.schema.Array(new _normalizr.schema.Entity(collection));

var fetch = exports.fetch = function fetch(_ref) {
  var serviceId = _ref.serviceId,
      accountId = _ref.accountId,
      optionsKey = _ref.optionsKey;
  return (0, _callApi2.default)('services/' + serviceId + '/accounts/' + accountId + '/options/' + optionsKey, schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/fields/dynamicOptions.js