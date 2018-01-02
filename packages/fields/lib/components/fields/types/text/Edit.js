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

var _recompose = require('recompose');

var _fp = require('lodash/fp');

var _reactForms = require('@signavio/react-forms');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _higherOrder = require('../../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var omitProps = (0, _recompose.compose)(_recompose.mapProps, _fp.omit);


var ClearableText = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnEnter, (0, _higherOrder.createClearable)({ triggerOnComplete: true }), omitProps('onComplete'), _reactForms.createNullable)(_forms.Text);

var NullableTextarea = (0, _reactForms.createNullable)(_forms.Textarea);

var Edit = function Edit(_ref) {
  var type = _ref.type,
      inputType = _ref.inputType,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['type', 'inputType']);
  return type.multiLine ? _react2.default.createElement(NullableTextarea, (0, _fp.omit)('onComplete', rest)) : _react2.default.createElement(ClearableText, (0, _extends3.default)({}, rest, { type: inputType }));
};

exports.default = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnBlur, (0, _styles.defaultStyle)(function (_ref2) {
  var font = _ref2.font,
      padding = _ref2.padding,
      lineHeight = _ref2.lineHeight;
  return {
    width: '100%',

    '&fitInTile': {
      height: _styles.utils.calculateHeight(font.size.normal, lineHeight, padding.small)
    }
  };
}, function (_ref3) {
  var fitInTile = _ref3.fitInTile;
  return {
    '&fitInTile': fitInTile
  };
}), omitProps('fitInTile'))(Edit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/text/Edit.js