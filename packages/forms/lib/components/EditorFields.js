'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _lodash = require('lodash');

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _rules = require('./rules');

var _FieldDefinition = require('./FieldDefinition');

var _FieldDefinition2 = _interopRequireDefault(_FieldDefinition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorFields = function EditorFields(_ref) {
  var activeFieldId = _ref.activeFieldId,
      draggableSortableConnection = _ref.draggableSortableConnection,
      fieldDefinitions = _ref.fieldDefinitions,
      readOnly = _ref.readOnly,
      transformConfiguration = _ref.transformConfiguration,
      canToggleList = _ref.canToggleList,
      onSort = _ref.onSort,
      onClick = _ref.onClick,
      onClose = _ref.onClose,
      onRemove = _ref.onRemove,
      onConfigurationChange = _ref.onConfigurationChange,
      onToggleList = _ref.onToggleList,
      style = _ref.style;
  return _react2.default.createElement(
    _components.Sortable,
    {
      component: 'div',
      childComponent: 'div',
      handle: readOnly ? '[data-skipDrag]' : '[data-dragHandle]',
      onSort: onSort,
      draggableConnection: draggableSortableConnection
    },
    fieldDefinitions.length === 0 ? _react2.default.createElement(
      _components.Hint,
      null,
      (0, _signavioI18n2.default)('Add fields from the palette at the right')
    ) : fieldDefinitions.map(function (fieldDefinition) {
      return _react2.default.createElement(
        _components.Collapsible,
        {
          key: fieldDefinition.id,
          expanded: fieldDefinition.id === activeFieldId && fieldDefinition.customRules,
          header: _react2.default.createElement(_FieldDefinition2.default, {
            readOnly: readOnly,
            active: fieldDefinition.id === activeFieldId,
            fieldDefinition: fieldDefinition,
            transformConfiguration: transformConfiguration,
            canToggleList: canToggleList,
            onClick: onClick,
            onClose: onClose,
            onRemove: onRemove,
            onConfigurationChange: onConfigurationChange,
            onToggleList: onToggleList
          }),
          preventToggle: true
        },
        _react2.default.createElement(
          'div',
          style('customRules'),
          _react2.default.createElement(
            _components.Feature,
            { feature: 'Component.DynamicForms' },
            _react2.default.createElement(_rules.CustomRules, {
              fieldDefinition: fieldDefinition,
              onChange: onConfigurationChange
            })
          )
        )
      );
    })
  );
};

exports.default = (0, _recompose.compose)((0, _recompose.withState)('activeFieldId', 'setActiveFieldId', null), (0, _recompose.withHandlers)({
  onClick: function onClick(_ref2) {
    var activeFieldId = _ref2.activeFieldId,
        setActiveFieldId = _ref2.setActiveFieldId;
    return function (fieldDefinition) {
      return setActiveFieldId(activeFieldId === fieldDefinition.id ? null : fieldDefinition.id);
    };
  },
  onClose: function onClose(_ref3) {
    var setActiveFieldId = _ref3.setActiveFieldId;
    return function () {
      return setActiveFieldId(null);
    };
  },
  onRemove: function (_onRemove) {
    function onRemove(_x) {
      return _onRemove.apply(this, arguments);
    }

    onRemove.toString = function () {
      return _onRemove.toString();
    };

    return onRemove;
  }(function (_ref4) {
    var setActiveFieldId = _ref4.setActiveFieldId,
        onRemove = _ref4.onRemove;
    return function (fieldDefinition) {
      setActiveFieldId(null);

      onRemove(fieldDefinition);
    };
  })
}), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref5) {
    var fieldDefinitions = _ref5.fieldDefinitions,
        setActiveFieldId = _ref5.setActiveFieldId;

    var userHasAddedNewField = this.props.fieldDefinitions.length < fieldDefinitions.length;
    if (!userHasAddedNewField) {
      return;
    }
    // Find recently added field and set as active
    var newActiveField = (0, _lodash.differenceBy)(fieldDefinitions, this.props.fieldDefinitions, 'id');

    setActiveFieldId(newActiveField[0].id);
  }
}), (0, _styles.defaultStyle)(function (_ref6) {
  var padding = _ref6.padding;
  return {
    customRules: {
      paddingBottom: padding.normal,
      paddingTop: padding.normal
    }
  };
}))(EditorFields);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/EditorFields.js