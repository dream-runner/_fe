'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoValue;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _types = require('./types');

var typeComponents = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoValue(props) {
  var type = props.type;

  var _ref = typeComponents[type.name] || {},
      Component = _ref.NoValue;

  if (!Component) {
    return _react2.default.createElement(
      'span',
      null,
      (0, _signavioI18n2.default)('No value set')
    );
  }

  return _react2.default.createElement(Component, props);
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/NoValue.js