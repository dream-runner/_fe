'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collectEntries;

var _lodash = require('lodash');

function collectEntries(access) {
  return (0, _lodash.reduce)(access, function (entries, acl) {
    return (0, _lodash.union)(entries, acl.map(function (_ref) {
      var id = _ref.id;
      return id;
    }));
  }, []);
}


// WEBPACK FOOTER //
// ./packages/access/lib/utils/collectEntries.js