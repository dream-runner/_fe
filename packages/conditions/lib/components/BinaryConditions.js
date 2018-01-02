'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _BinaryCondition = require('./BinaryCondition');

var _BinaryCondition2 = _interopRequireDefault(_BinaryCondition);

var _higherOrder = require('../higher-order');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RemovableBinaryCondition = (0, _higherOrder.createRemovable)(_BinaryCondition2.default);

var BinaryConditions = function BinaryConditions(_ref) {
  var conditions = _ref.conditions,
      filterBindables = _ref.filterBindables,
      _onChange = _ref.onChange,
      readOnly = _ref.readOnly;
  return _react2.default.createElement(
    _components.List,
    null,
    conditions.map(function (condition, index) {
      return _react2.default.createElement(RemovableBinaryCondition, (0, _extends3.default)({
        key: index
      }, condition, {
        filterBindables: filterBindables,
        onChange: function onChange(newCondition) {
          return _onChange([].concat((0, _toConsumableArray3.default)(conditions.slice(0, index)), [newCondition], (0, _toConsumableArray3.default)(conditions.slice(index + 1))));
        },
        onRemove: function onRemove() {
          return _onChange([].concat((0, _toConsumableArray3.default)(conditions.slice(0, index)), (0, _toConsumableArray3.default)(conditions.slice(index + 1))));
        },
        readOnly: readOnly
      }));
    }),
    _react2.default.createElement(_components.Divider, null),
    _react2.default.createElement(
      _buttons.AddButton,
      {
        onClick: function onClick() {
          return _onChange([].concat((0, _toConsumableArray3.default)(conditions), [{ left: {}, type: 'equals', right: {} }]));
        },
        block: true,
        light: true
      },
      (0, _signavioI18n2.default)('Click to add an additional condition')
    )
  );
};

exports.default = BinaryConditions;


// WEBPACK FOOTER //
// ./packages/conditions/lib/components/BinaryConditions.js