'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.default = lookupBackboneCache;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UniqueModel = void 0;
try {
  UniqueModel = require('uniquemodel');
} catch (e) {}

function lookupBackboneCache(cacheName, collectionName, id) {
  if (!UniqueModel) {
    return;
  }

  var cache = UniqueModel.getModelCache(cacheName);
  var cachedInstance = cache && cache.instances && cache.instances[id];
  if (cachedInstance && cachedInstance.isSynced) {
    return new Promise(function (resolve, reject) {
      resolve({
        response: {
          result: id,
          entities: (0, _defineProperty3.default)({}, collectionName, (0, _defineProperty3.default)({}, id, cachedInstance.toJSON()))
        }
      });
    });
  }
}


// WEBPACK FOOTER //
// ./packages/api/lib/lookupBackboneCache.js