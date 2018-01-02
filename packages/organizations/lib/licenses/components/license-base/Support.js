'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _higherOrder = require('../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Support = function Support(_ref) {
  var children = _ref.children,
      style = _ref.style;
  return _react2.default.createElement(
    _components.Group,
    { style: style, title: (0, _signavioI18n2.default)('Support') },
    children
  );
};

exports.default = (0, _recompose.compose)(_higherOrder.groupStyle, (0, _styles.defaultStyle)(function (theme) {
  return {
    paddingLeft: theme.padding.normal
  };
}))(Support);


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/components/license-base/Support.js