'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _higherOrder = require('../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _higherOrder.groupStyle)(function (_ref) {
  var children = _ref.children,
      style = _ref.style;
  return _react2.default.createElement(
    _components.Group,
    { style: style, title: (0, _signavioI18n2.default)('Limitations') },
    children
  );
});


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/components/license-base/Limitations.js