'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _extensions = require('@signavio/effektif-commons/lib/extensions');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'licenses';

var schema = exports.schema = new _normalizr.schema.Entity(collection, {}, { idAttribute: function idAttribute(license) {
    return compositeId(license);
  } });

var compositeId = function compositeId(license) {
  var id = '';

  if (license.isGenerator) {
    id = '+';
  }

  id += license.type;

  if (license.packages) {
    id += ';' + license.packages.join('+');
  }

  if (license.expirationDate) {
    id += ';' + (0, _extensions.moment)(license.expirationDate).utc().format('DD-MM-YYYY');
  }

  return id;
};

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id;
  return (0, _callApi2.default)('info/licenses/' + id, schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/organizations/license.js