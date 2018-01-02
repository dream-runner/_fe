'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.shape({
  message: _propTypes2.default.string.isRequired, // the actual log message
  type: _propTypes2.default.string.isRequired, // the log level, one of: "debug", "info", "warn", "error"
  context: _propTypes2.default.object // an object which can different addition bits of information like "field", "stackTrace"
});


// WEBPACK FOOTER //
// ./packages/commons/lib/propTypes/Log.js