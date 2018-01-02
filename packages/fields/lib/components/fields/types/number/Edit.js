'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _reactForms = require('@signavio/react-forms');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _higherOrder = require('../../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Edit(_ref) {
  var _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? '#123' : _ref$placeholder,
      locale = _ref.locale,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['placeholder', 'locale']);

  return _react2.default.createElement(_reactForms.Number, (0, _extends3.default)({}, (0, _lodash.omit)(rest, 'type', 'onComplete'), {
    placeholder: placeholder,
    culture: (locale || (0, _signavioI18n.locale)()).replace('_', '-')
  }));
}
exports.default = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnBlur, _reactForms.triggerOnCompleteOnEnter, (0, _higherOrder.createClearable)({ triggerOnComplete: true }), (0, _styles.defaultStyle)({
  width: '100%'
}))(Edit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/number/Edit.js