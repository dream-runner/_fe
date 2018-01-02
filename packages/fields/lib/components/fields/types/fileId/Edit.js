'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _reactForms = require('@signavio/react-forms');

var _higherOrder = require('../../higher-order');

var _Show = require('./Show');

var _Show2 = _interopRequireDefault(_Show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Edit(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;

  if (value) {
    return _react2.default.createElement(_Show2.default, { value: value });
  }

  return _react2.default.createElement(_components.FileUpload, { onUploaded: function onUploaded(_ref2) {
      var id = _ref2.id;
      return onChange(id);
    } });
}

exports.default = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnChange, (0, _higherOrder.createClearable)({ triggerOnComplete: false }))(Edit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/fileId/Edit.js