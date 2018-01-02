'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = License;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Academic = require('./Academic');

var _Academic2 = _interopRequireDefault(_Academic);

var _Enterprise = require('./Enterprise');

var _Enterprise2 = _interopRequireDefault(_Enterprise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeToView = { academic: _Academic2.default, enterprise: _Enterprise2.default };
function License(_ref) {
  var type = _ref.type,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['type']);

  var Component = typeToView[type];

  if (!Component) {
    throw new Error('Could not find license view for type ' + type);
  }

  return _react2.default.createElement(Component, rest);
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/components/License.js