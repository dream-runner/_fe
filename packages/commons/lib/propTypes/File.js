'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.shape({
  src: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,
  contentType: _propTypes2.default.string.isRequired,

  size: _propTypes2.default.number.isRequired
});


// WEBPACK FOOTER //
// ./packages/commons/lib/propTypes/File.js