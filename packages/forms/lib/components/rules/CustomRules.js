'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _tabs = require('@signavio/effektif-commons/lib/components/tabs');

var _ReadOnlyRule = require('./ReadOnlyRule');

var _ReadOnlyRule2 = _interopRequireDefault(_ReadOnlyRule);

var _RequiredRule = require('./RequiredRule');

var _RequiredRule2 = _interopRequireDefault(_RequiredRule);

var _VisibilityRule = require('./VisibilityRule');

var _VisibilityRule2 = _interopRequireDefault(_VisibilityRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomRules = function CustomRules(_ref) {
  var fieldDefinition = _ref.fieldDefinition,
      onConfigurationsClick = _ref.onConfigurationsClick,
      onReadOnlyChange = _ref.onReadOnlyChange,
      onRequiredChange = _ref.onRequiredChange,
      onVisibilityChange = _ref.onVisibilityChange,
      onVisibilityClick = _ref.onVisibilityClick,
      tab = _ref.tab;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _tabs.TabBar,
      null,
      _react2.default.createElement(
        _tabs.Tab,
        { active: tab === 'visibility', onClick: onVisibilityClick },
        (0, _signavioI18n2.default)('Visibility')
      ),
      _react2.default.createElement(
        _tabs.Tab,
        { active: tab === 'configurations', onClick: onConfigurationsClick },
        (0, _signavioI18n2.default)('Configurations')
      )
    ),
    tab === 'visibility' && fieldDefinition.customRules && _react2.default.createElement(_VisibilityRule2.default, {
      fieldDefinition: fieldDefinition,
      onChange: onVisibilityChange
    }),
    tab === 'configurations' && fieldDefinition.customRules && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_ReadOnlyRule2.default, {
        fieldDefinition: fieldDefinition,
        onChange: onReadOnlyChange
      }),
      _react2.default.createElement(_components.Divider, null),
      _react2.default.createElement(_RequiredRule2.default, {
        fieldDefinition: fieldDefinition,
        onChange: onRequiredChange
      })
    ),
    _react2.default.createElement(_components.Divider, null)
  );
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('tab', 'setTab', 'visibility'), (0, _recompose.withHandlers)({
  onConfigurationsClick: function onConfigurationsClick(_ref2) {
    var setTab = _ref2.setTab;
    return function () {
      return setTab('configurations');
    };
  },
  onReadOnlyChange: function onReadOnlyChange(_ref3) {
    var fieldDefinition = _ref3.fieldDefinition,
        onChange = _ref3.onChange;
    return function (value) {
      onChange(fieldDefinition, 'customReadOnly', value);
    };
  },
  onRequiredChange: function onRequiredChange(_ref4) {
    var fieldDefinition = _ref4.fieldDefinition,
        onChange = _ref4.onChange;
    return function (value) {
      onChange(fieldDefinition, 'customRequired', value);
    };
  },
  onVisibilityChange: function onVisibilityChange(_ref5) {
    var fieldDefinition = _ref5.fieldDefinition,
        onChange = _ref5.onChange;
    return function (value) {
      onChange(fieldDefinition, 'customVisibility', value);
    };
  },
  onVisibilityClick: function onVisibilityClick(_ref6) {
    var setTab = _ref6.setTab;
    return function () {
      return setTab('visibility');
    };
  }
}))(CustomRules);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/rules/CustomRules.js