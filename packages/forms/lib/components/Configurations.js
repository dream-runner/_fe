'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _utils = require('@signavio/effektif-commons/lib/utils');

var _effektifFields = require('@signavio/effektif-fields');

var _utils2 = require('./utils');

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Conversions = require('./Conversions');

var _Conversions2 = _interopRequireDefault(_Conversions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Configurations = function Configurations(_ref) {
  var canToggleList = _ref.canToggleList,
      fieldDefinition = _ref.fieldDefinition,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      variables = _ref.variables,
      readOnly = _ref.readOnly,
      style = _ref.style,
      transformConfiguration = _ref.transformConfiguration,
      onConfigurationChange = _ref.onConfigurationChange,
      onKeyDown = _ref.onKeyDown,
      onRemove = _ref.onRemove,
      onListConvert = _ref.onListConvert;

  var configurations = (0, _utils2.resolveConfigurations)(fieldDefinition, readOnly, dataTypeDescriptors, variables, transformConfiguration);

  var descriptor = (0, _utils2.resolveDescriptor)(fieldDefinition, dataTypeDescriptors, variables);

  var variable = _effektifFields.expressionUtils.getVariable(variables, fieldDefinition.binding.expression);

  var nameConfig = configurations.find(function (configuration) {
    return configuration.key === 'name';
  });

  return _react2.default.createElement(
    _components.List,
    style,
    _react2.default.createElement(
      _tiles.Tile,
      {
        icon: descriptor.icon,
        toolbar: _react2.default.createElement(_components.Remove, { disabled: readOnly, onRemove: onRemove })
      },
      _react2.default.createElement(_Configuration2.default, {
        autoFocus: (0, _lodash.isEmpty)(nameConfig.value),
        fieldDefinition: fieldDefinition,
        noClear: true,
        onConfigurationChange: onConfigurationChange,
        onKeyDown: onKeyDown,
        style: style('nameConfig'),
        configuration: (0, _extends3.default)({}, nameConfig, {
          value: nameConfig.value || null
        })
      })
    ),
    _react2.default.createElement(
      'div',
      style('configurations'),
      (0, _lodash.reject)(configurations, {
        key: 'name'
      }).map(function (configuration) {
        return _react2.default.createElement(
          _components.Feature,
          { feature: configuration.feature, key: configuration.key },
          _react2.default.createElement(_Configuration2.default, {
            configuration: configuration,
            fieldDefinition: fieldDefinition,
            onConfigurationChange: onConfigurationChange
          })
        );
      }),
      !descriptor.noListSupport && _react2.default.createElement(_Conversions2.default, {
        canToggleList: canToggleList(fieldDefinition),
        isList: _effektifFields.dataTypeUtils.isList(variable.type),
        onChange: onListConvert,
        readOnly: readOnly
      })
    )
  );
};
exports.default = (0, _recompose.compose)(_effektifFields.getFieldsContext, (0, _recompose.withHandlers)({
  onRemove: function onRemove(_ref2) {
    var fieldDefinition = _ref2.fieldDefinition,
        _onRemove = _ref2.onRemove;
    return function () {
      return _onRemove(fieldDefinition);
    };
  },
  onListConvert: function onListConvert(_ref3) {
    var fieldDefinition = _ref3.fieldDefinition,
        variables = _ref3.variables,
        onToggleList = _ref3.onToggleList;
    return function () {
      return onToggleList((0, _utils2.toggleList)(variables, fieldDefinition));
    };
  },
  onKeyDown: function onKeyDown(_ref4) {
    var onClose = _ref4.onClose;
    return function (event) {
      if (_utils.KeyUtils.isEnter(event)) {
        onClose();
      }
    };
  },
  onConfigurationChange: function onConfigurationChange(_ref5) {
    var fieldDefinition = _ref5.fieldDefinition,
        onConfigurationChange = _ref5.onConfigurationChange;

    return function (key, value) {
      return onConfigurationChange(fieldDefinition, key, value);
    };
  }
}), (0, _styles.defaultStyle)(function (_ref6) {
  var color = _ref6.color,
      padding = _ref6.padding;
  return (0, _extends3.default)({
    backgroundColor: 'white'
  }, _styles.utils.popover(color), {

    nameConfig: (0, _extends3.default)({}, _styles.utils.borderTop('1px', 'solid', 'transparent')),

    configurations: {
      paddingBottom: padding.normal,
      paddingLeft: padding.normal,
      paddingRight: padding.normal
    }
  });
}))(Configurations);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/Configurations.js