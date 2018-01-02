'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _Show = require('./Show');

var _Show2 = _interopRequireDefault(_Show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BindingOption = function BindingOption(_ref) {
  var search = _ref.search,
      bindable = _ref.bindable,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['search', 'bindable', 'dataTypeDescriptors', 'variables']);
  return _react2.default.createElement(
    _forms.Option,
    rest,
    _react2.default.createElement(_Show2.default, { search: search, binding: bindable, transparent: true })
  );
};
exports.default = BindingOption;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/BindingOption.js