'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = CustomCondition;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _grid = require('@signavio/effektif-commons/lib/components/grid');

var _forms = require('@signavio/effektif-commons/lib/components/forms');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _components = require('@signavio/effektif-commons/lib/components');

var _effektifConditions = require('@signavio/effektif-conditions');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Condition = (0, _effektifConditions.createRemovable)(_effektifConditions.BinaryCondition);

function CustomCondition(_ref) {
  var conditions = _ref.conditions,
      onAdd = _ref.onAdd,
      onChangeType = _ref.onChangeType,
      onRemove = _ref.onRemove,
      onReplace = _ref.onReplace,
      readOnly = _ref.readOnly,
      type = _ref.type;

  if ((0, _lodash.isEmpty)(conditions)) {
    if (readOnly) {
      return null;
    }

    return _react2.default.createElement(
      _grid.Row,
      null,
      _react2.default.createElement(
        _grid.Col,
        { md: 10, mdOffset: 2 },
        _react2.default.createElement(
          _buttons.IconButton,
          { icon: 'plus', onClick: onAdd, block: true, light: true },
          (0, _signavioI18n2.default)('Add a filter condition')
        )
      )
    );
  }

  return _react2.default.createElement(
    _grid.Row,
    null,
    _react2.default.createElement(
      _grid.Col,
      { md: 2 },
      _react2.default.createElement(
        'h5',
        {
          style: {
            textAlign: 'right',
            lineHeight: _styles.variables.lineHeight.block + 'px'
          }
        },
        (0, _signavioI18n2.default)('Cases must fulfill')
      )
    ),
    _react2.default.createElement(
      _grid.Col,
      { md: 10 },
      _react2.default.createElement(
        _components.List,
        null,
        _react2.default.createElement(OperatorSelect, {
          value: type,
          onChange: onChangeType,
          readOnly: readOnly
        }),
        conditions.map(function (condition, i) {
          return _react2.default.createElement(Condition, (0, _extends3.default)({
            key: i
          }, condition, {
            disableTemplate: true,
            disableExpressionOnRight: true,
            filterBindables: _utils.canUseFilter,
            onChange: function onChange(newCondition) {
              return onReplace(i, newCondition);
            },
            onRemove: function (_onRemove) {
              function onRemove() {
                return _onRemove.apply(this, arguments);
              }

              onRemove.toString = function () {
                return _onRemove.toString();
              };

              return onRemove;
            }(function () {
              return onRemove(i);
            }),
            readOnly: readOnly
          }));
        })
      ),
      !readOnly && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_components.Divider, null),
        _react2.default.createElement(
          _buttons.IconButton,
          { icon: 'plus', onClick: onAdd, block: true, light: true },
          (0, _signavioI18n2.default)('Add another condition')
        )
      )
    )
  );
}

function OperatorSelect(props) {
  return _react2.default.createElement(
    _forms.DropdownSelect,
    props,
    _react2.default.createElement(_forms.Option, { value: 'and', name: (0, _signavioI18n2.default)('all of the following conditions') }),
    _react2.default.createElement(_forms.Option, {
      value: 'or',
      name: (0, _signavioI18n2.default)('at least one of the following conditions')
    })
  );
}


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/components/CustomCondition.js