'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getToken = (0, _recompose.getContext)({
  token: _propTypes2.default.string.isRequired
});

exports.default = getToken;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/higher-order/getToken.js