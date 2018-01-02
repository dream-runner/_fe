'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.shape({
  id: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,

  admin: _propTypes2.default.bool,
  licenseRequired: _propTypes2.default.bool,

  members: _propTypes2.default.arrayOf(_User2.default),
  admins: _propTypes2.default.arrayOf(_User2.default)
});


// WEBPACK FOOTER //
// ./packages/commons/lib/propTypes/Organization.js