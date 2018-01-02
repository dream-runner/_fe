'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _fields = require('../fields');

var _EditExpression = require('./EditExpression');

var _EditExpression2 = _interopRequireDefault(_EditExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EditValueOrExpression(_ref) {
  var type = _ref.type,
      binding = _ref.binding,
      showExpression = _ref.showExpression,
      placeholder = _ref.placeholder,
      bindables = _ref.bindables,
      readOnly = _ref.readOnly,
      allowCreate = _ref.allowCreate,
      onChangeExpression = _ref.onChangeExpression,
      onChangeValue = _ref.onChangeValue,
      onToggleExpression = _ref.onToggleExpression,
      onCreateVariable = _ref.onCreateVariable;

  if (showExpression) {
    return _react2.default.createElement(_EditExpression2.default, {
      autoFocus: true,
      allowCreate: allowCreate,
      readOnly: readOnly,
      type: type,
      placeholder: placeholder,
      bindables: bindables,
      onChange: onChangeExpression,
      onCollapse: onToggleExpression,
      onCreateVariable: onCreateVariable
    });
  }

  return _react2.default.createElement(
    _tiles.Tile,
    {
      toolbar: _react2.default.createElement(
        'div',
        { style: { marginLeft: 1 } },
        _react2.default.createElement(_buttons.IconButton, {
          icon: 'link',
          disabled: readOnly,
          onClick: onToggleExpression
        })
      )
    },
    _react2.default.createElement(_fields.Field, {
      readOnly: readOnly,
      type: type,
      value: binding && binding.value,
      fitInTile: type.multiLine,
      onComplete: onChangeValue
    })
  );
}
exports.default = (0, _recompose.compose)((0, _recompose.withState)('showExpression', 'toggleShowExpression', false), (0, _recompose.withHandlers)({
  onChangeExpression: function onChangeExpression(_ref2) {
    var onChange = _ref2.onChange;
    return function (expression) {
      if ((0, _lodash.isNil)(expression)) {
        onChange(null);
      } else {
        onChange({ expression: expression });
      }
    };
  },
  onChangeValue: function onChangeValue(_ref3) {
    var type = _ref3.type,
        onChange = _ref3.onChange;

    return function (value) {
      if ((0, _lodash.isNil)(value)) {
        onChange(null);
      } else {
        onChange({ value: value, type: type });
      }
    };
  },
  onToggleExpression: function onToggleExpression(_ref4) {
    var showExpression = _ref4.showExpression,
        toggleShowExpression = _ref4.toggleShowExpression;
    return function () {
      return toggleShowExpression(!showExpression);
    };
  }
}))(EditValueOrExpression);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/EditValueOrExpression.js