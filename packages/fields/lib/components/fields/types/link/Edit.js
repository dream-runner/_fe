'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _reactForms = require('@signavio/react-forms');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _higherOrder = require('../../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditLink = function EditLink(props) {
  return _react2.default.createElement(_reactForms.Url, (0, _lodash.omit)(props, 'type', 'onComplete'));
};

exports.default = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnBlur, _reactForms.triggerOnCompleteOnEnter, (0, _higherOrder.createClearable)({ triggerOnComplete: true }), (0, _styles.defaultStyle)({
  width: '100%'
}))(EditLink);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/link/Edit.js