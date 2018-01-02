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

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _effektifFields = require('@signavio/effektif-fields');

var _operators = require('../operators');

var _operators2 = _interopRequireDefault(_operators);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getBindingType = _effektifFields.bindingUtils.getType,
    isBindingEmpty = _effektifFields.bindingUtils.isEmpty;


var BinaryOperatorSelect = function BinaryOperatorSelect(_ref) {
  var left = _ref.left,
      right = _ref.right,
      type = _ref.type,
      onChange = _ref.onChange,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['left', 'right', 'type', 'onChange', 'dataTypeDescriptors', 'variables']);

  var getType = getBindingType(dataTypeDescriptors, variables);
  var leftType = left && getType(left);

  var filteredOperators = (0, _utils.applicableOperators)(leftType, right && !isBindingEmpty(right) && getType(right));

  return _react2.default.createElement(
    _forms.DropdownSelect,
    (0, _extends3.default)({
      disabled: filteredOperators.length === 0,
      value: type,
      onChange: onChange
    }, rest),
    filteredOperators.map(function (operatorType) {
      return _react2.default.createElement(_forms.Option, {
        key: operatorType,
        name: (0, _operators.name)(operatorType, leftType),
        keywords: (0, _operators.keywords)(operatorType),
        value: operatorType,
        tooltip: (0, _operators.name)(operatorType, leftType)
      });
    }),
    filteredOperators.length === 0 && // always render `equals` option, which is the default value
    _react2.default.createElement(_forms.Option, {
      name: (0, _operators.name)(_operators2.default.equals, leftType),
      value: _operators2.default.equals
    })
  );
};

exports.default = (0, _effektifFields.getFieldsContext)(BinaryOperatorSelect);


// WEBPACK FOOTER //
// ./packages/conditions/lib/components/BinaryOperatorSelect.js