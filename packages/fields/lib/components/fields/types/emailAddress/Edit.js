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

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _reactForms = require('@signavio/react-forms');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _higherOrder = require('../../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Edit = function Edit(_ref) {
  var small = _ref.small,
      transparent = _ref.transparent,
      value = _ref.value,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['small', 'transparent', 'value']);
  return _react2.default.createElement(
    _tiles.Tile,
    { small: small, transparent: transparent },
    _react2.default.createElement(_reactForms.Email, (0, _extends3.default)({}, (0, _lodash.omit)(rest, 'onComplete'), {
      noValidate: 'novalidate',
      value: value || '',
      placeholder: (0, _signavioI18n2.default)('Please enter an email address')
    }))
  );
};

exports.default = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnBlur, _reactForms.triggerOnCompleteOnEnter, (0, _higherOrder.createClearable)({ triggerOnComplete: true }), (0, _styles.defaultStyle)({
  width: '100%'
}))(Edit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/emailAddress/Edit.js