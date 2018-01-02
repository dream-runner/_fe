'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ELearningLink;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ELearningLink(_ref) {
  var children = _ref.children;

  var url = 'https://mooc.house/channels/signavio';

  return _react2.default.createElement(
    'a',
    { href: url, rel: 'external' },
    children
  );
}


// WEBPACK FOOTER //
// ./packages/commons/lib/components/ELearningLink.js