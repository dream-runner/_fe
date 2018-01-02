'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _expressions = require('../../expressions');

var _dataTypes = require('../../dataTypes');

var _fields = require('../fields');

var _getFieldsContext = require('../getFieldsContext');

var _getFieldsContext2 = _interopRequireDefault(_getFieldsContext);

var _ShowExpression = require('./ShowExpression');

var _ShowExpression2 = _interopRequireDefault(_ShowExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShowBinding = function ShowBinding(_ref) {
  var binding = _ref.binding,
      type = _ref.type,
      search = _ref.search,
      variables = _ref.variables,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      transparent = _ref.transparent,
      small = _ref.small;

  if ((0, _lodash.isNil)(binding)) {
    return _react2.default.createElement(_fields.Field, { readOnly: true, type: type });
  }

  var expression = binding.expression,
      value = binding.value;


  var isStatic = !expression;
  var isEmpty = !expression && (value === null || value === undefined);

  if (!isStatic && !isEmpty) {
    if (!(0, _expressions.getVariable)(variables, expression)) {
      return _react2.default.createElement(
        _tiles.TextTile,
        (0, _extends3.default)({ icon: 'cancel' }, { transparent: transparent, small: small }),
        _react2.default.createElement(
          _components.Empty,
          null,
          (0, _signavioI18n2.default)('Deleted field')
        )
      );
    }
  }

  var finalType = type || (0, _expressions.resolveType)(dataTypeDescriptors, variables, expression);

  if (isStatic || isEmpty) {
    return _react2.default.createElement(_fields.Field, (0, _extends3.default)({
      readOnly: true,
      type: finalType,
      value: value
    }, { transparent: transparent, small: small }));
  }

  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({
      icon: (0, _dataTypes.getIcon)(dataTypeDescriptors, finalType)
    }, { transparent: transparent, small: small }),
    _react2.default.createElement(_ShowExpression2.default, {
      dataTypeDescriptors: dataTypeDescriptors,
      variables: variables,
      expression: expression,
      search: search
    })
  );
};

exports.default = (0, _getFieldsContext2.default)(ShowBinding);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/Show.js