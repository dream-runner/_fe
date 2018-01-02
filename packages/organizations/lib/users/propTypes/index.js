'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserType = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserType = exports.UserType = _propTypes2.default.shape({
  id: _propTypes2.default.string.isRequired,
  firstName: _propTypes2.default.string.isRequired,
  lastName: _propTypes2.default.string.isRequired,

  color: _propTypes2.default.string,

  systemAdmin: _propTypes2.default.bool,
  systemUser: _propTypes2.default.bool
});


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/propTypes/index.js