'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _effektifFields = require('@signavio/effektif-fields');

var _operators = require('../operators');

var _operators2 = _interopRequireDefault(_operators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nAryOperators = (0, _lodash.values)(_operators2.default).filter(_operators.isNAry);


var NAryOperatorSelect = function NAryOperatorSelect(_ref) {
  var type = _ref.type,
      onChange = _ref.onChange,
      children = _ref.children,
      readOnly = _ref.readOnly;
  return _react2.default.createElement(
    _forms.DropdownSelect,
    {
      disabled: nAryOperators.length === 0,
      value: type,
      onChange: onChange,
      readOnly: readOnly
    },
    nAryOperators.map(function (operatorType) {
      return _react2.default.createElement(_forms.Option, {
        key: operatorType,
        name: (0, _operators.name)(operatorType),
        keywords: (0, _operators.keywords)(operatorType),
        value: operatorType
      });
    }),
    children
  );
};

exports.default = (0, _effektifFields.getFieldsContext)(NAryOperatorSelect);


// WEBPACK FOOTER //
// ./packages/conditions/lib/components/NAryOperatorSelect.js