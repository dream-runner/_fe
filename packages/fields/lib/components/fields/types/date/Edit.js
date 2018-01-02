'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _reactForms = require('@signavio/react-forms');

var _higherOrder = require('../../higher-order');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Edit = function Edit(_ref) {
  var type = _ref.type,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['type']);

  var Component = (0, _utils.getComponentForKind)(type.kind);

  return _react2.default.createElement(Component, rest);
};

var enhance = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnChange, (0, _higherOrder.createClearable)({ triggerOnComplete: true }), (0, _styles.defaultStyle)({
  width: '100%'
}));
exports.default = enhance(Edit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/date/Edit.js