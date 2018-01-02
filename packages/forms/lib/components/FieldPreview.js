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

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _effektifFields = require('@signavio/effektif-fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldPreview = function FieldPreview(_ref) {
  var hasDefaultLabel = _ref.hasDefaultLabel,
      label = _ref.label,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['hasDefaultLabel', 'label']);

  if (rest.asButtons) {
    return _react2.default.createElement(_effektifFields.Field, rest);
  }

  return _react2.default.createElement(_effektifFields.LabeledField, (0, _extends3.default)({
    label: hasDefaultLabel ? _react2.default.createElement(
      _hints.Hint,
      { inline: true },
      label
    ) : label
  }, (0, _lodash.omit)(rest, 'asButtons')));
};

exports.default = FieldPreview;


// WEBPACK FOOTER //
// ./packages/forms/lib/components/FieldPreview.js