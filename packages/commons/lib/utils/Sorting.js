'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.alphaNumeric = function (model) {
  return String(model.get('name') || model.get('title') || model.id).replace(/[^a-z0-9]/gi, '').toLowerCase();
};
exports.users = function (users) {
  return _lodash2.default.sortBy(users, function (user) {
    return user.get('lastName').toLowerCase();
  });
};
exports.groups = function (groups) {
  return _lodash2.default.sortBy(groups, function (group) {
    return group.get('name').toLowerCase();
  });
};


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/Sorting.js