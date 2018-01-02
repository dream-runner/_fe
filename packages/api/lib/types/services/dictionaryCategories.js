'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.schema = exports.dictionaryCategorySchema = exports.collection = undefined;

var _normalizr = require('normalizr');

var _callApi = require('../../callApi');

var _callApi2 = _interopRequireDefault(_callApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collection = exports.collection = 'dictionaryCategories';
var dictionaryCategorySchema = exports.dictionaryCategorySchema = new _normalizr.schema.Entity(collection);

var schema = exports.schema = new _normalizr.schema.Array(dictionaryCategorySchema);

var fetch = exports.fetch = function fetch(_ref) {
  var id = _ref.id,
      searchTerm = _ref.searchTerm;

  var params = searchTerm ? '?filter=' + searchTerm : '';
  return (0, _callApi2.default)('dictionary/connectors/' + id + '/actions/find' + params, schema);
};


// WEBPACK FOOTER //
// ./packages/api/lib/types/services/dictionaryCategories.js