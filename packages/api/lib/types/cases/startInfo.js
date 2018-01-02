'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.fetch = exports.schema = exports.collection = undefined;

var _lodash = require('lodash');

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'startInfo';

var schema = exports.schema = new _normalizr.schema.Entity(collection, {}, {
  idAttribute: function idAttribute(startInfo) {
    if ((0, _lodash.isNil)(startInfo.form.fields)) {
      return '0';
    }

    return (0, _lodash.map)(startInfo.form.fields, function (field) {
      return field.id;
    }).join('-');
  }
});

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id;
  return (0, _callApi2.default)('workflows/' + id + '/startInfo', schema);
};

var update = exports.update = function update(_ref2, body) {
  var id = _ref2.id;
  return (0, _callApi2.default)('workflows/' + id + '/startInfo', schema, { method: 'PUT', body: body });
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/cases/startInfo.js