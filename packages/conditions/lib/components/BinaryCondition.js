'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _effektifFields = require('@signavio/effektif-fields');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _BinaryOperatorSelect = require('./BinaryOperatorSelect');

var _BinaryOperatorSelect2 = _interopRequireDefault(_BinaryOperatorSelect);

var _operators = require('../operators');

var _operators2 = _interopRequireDefault(_operators);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getBindingType = _effektifFields.bindingUtils.getType;


var columns = function columns() {
  for (var _len = arguments.length, elements = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    elements[_key - 1] = arguments[_key];
  }

  var widths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return _react2.default.createElement(
    'div',
    null,
    elements.map(function (el, i) {
      return _react2.default.createElement(
        'div',
        {
          key: i,
          style: {
            float: 'left',
            width: widths[i],
            paddingLeft: i > 0 ? 1 : 0
          }
        },
        el
      );
    }),
    _react2.default.createElement('div', { style: { clear: 'left' } })
  );
};

var BinaryCondition = function BinaryCondition(_ref) {
  var left = _ref.left,
      type = _ref.type,
      right = _ref.right,
      _onChange = _ref.onChange,
      readOnly = _ref.readOnly,
      disableTemplate = _ref.disableTemplate,
      disableExpressionOnRight = _ref.disableExpressionOnRight,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables,
      filterBindables = _ref.filterBindables;

  if ((0, _lodash.get)(left, 'expression') && !_effektifFields.expressionUtils.getVariable(variables, left.expression)) {
    return _react2.default.createElement(
      _tiles.TextTile,
      { icon: 'cancel', transparent: true },
      _react2.default.createElement(
        _components.Empty,
        null,
        (0, _signavioI18n2.default)('Deleted field')
      )
    );
  }

  var getType = getBindingType(dataTypeDescriptors, variables);
  var leftType = left && getType(left);

  var handleLeftChange = function handleLeftChange(newLeft) {
    var newLeftType = newLeft && getType(newLeft);
    if ((0, _operators.isApplicable)(type, newLeftType, right && getType(right))) {
      _onChange({ left: newLeft, type: type, right: right });
    } else {
      var newOp = newLeftType ? (0, _utils.applicableOperators)(newLeftType)[0] : _operators2.default.equals;
      _onChange({ left: newLeft, type: newOp });
    }
  };

  var rightControl = null;
  if (!!left && !(0, _operators.isUnary)(type)) {
    var rightType = (0, _operators.getApplicableRight)(type, leftType);
    rightControl = disableExpressionOnRight ? rightType ? _react2.default.createElement(_effektifFields.Field, {
      type: rightType,
      value: right.value,
      onComplete: function onComplete(value) {
        return _onChange({ left: left, type: type, right: { type: rightType, value: value } });
      },
      readOnly: readOnly
    }) : null : _react2.default.createElement(_effektifFields.Binding, {
      binding: right,
      allowStatic: true,
      disableTemplate: true,
      type: rightType,
      onChange: function onChange(newRight) {
        return _onChange({ left: left, type: type, right: newRight });
      },
      readOnly: readOnly
    });
  }

  return columns(['37%', '26%', '37%'], _react2.default.createElement(_effektifFields.Binding, {
    binding: left,
    onChange: handleLeftChange,
    canClear: !readOnly,
    readOnly: readOnly,
    filterBindables: filterBindables
  }), _react2.default.createElement(_BinaryOperatorSelect2.default, {
    type: type,
    left: left,
    right: right,
    onChange: function onChange(newType) {
      return _onChange({ left: left, right: right, type: newType });
    },
    readOnly: readOnly
  }), rightControl);
};

exports.default = (0, _recompose.compose)(_effektifFields.getFieldsContext, (0, _recompose.withHandlers)({
  filterBindables: function filterBindables(_ref2) {
    var _filterBindables = _ref2.filterBindables;
    return function (bindable, dataTypeDescriptors, variables) {
      var bindableType = _effektifFields.bindingUtils.getType(dataTypeDescriptors, variables, bindable);
      var someOperatorsAreApplicable = (0, _utils.applicableOperators)(bindableType).length > 0;

      return someOperatorsAreApplicable && (!_filterBindables || _filterBindables(bindable, dataTypeDescriptors, variables));
    };
  }
}))(BinaryCondition);


// WEBPACK FOOTER //
// ./packages/conditions/lib/components/BinaryCondition.js