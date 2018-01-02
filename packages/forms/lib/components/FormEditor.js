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

var _reactStickynode = require('react-stickynode');

var _reactStickynode2 = _interopRequireDefault(_reactStickynode);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _utils = require('@signavio/effektif-commons/lib/utils');

var _effektifFields = require('@signavio/effektif-fields');

var _utils2 = require('./utils');

var _EditorFields = require('./EditorFields');

var _EditorFields2 = _interopRequireDefault(_EditorFields);

var _FieldDefinition = require('./FieldDefinition');

var _FieldDefinition2 = _interopRequireDefault(_FieldDefinition);

var _FieldReuse = require('./FieldReuse');

var _FieldReuse2 = _interopRequireDefault(_FieldReuse);

var _Palette = require('./Palette');

var _Palette2 = _interopRequireDefault(_Palette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormEditor = function FormEditor(_ref) {
  var fieldDefinitions = _ref.fieldDefinitions,
      variables = _ref.variables,
      dataTypeDescriptors = _ref.dataTypeDescriptors,
      canToggleList = _ref.canToggleList,
      canReuseBindable = _ref.canReuseBindable,
      canUseType = _ref.canUseType,
      transformConfiguration = _ref.transformConfiguration,
      draggableSortableConnection = _ref.draggableSortableConnection,
      reuseNestedFields = _ref.reuseNestedFields,
      hasFieldReuse = _ref.hasFieldReuse,
      stickyTargetId = _ref.stickyTargetId,
      readOnly = _ref.readOnly,
      style = _ref.style,
      onConfigurationChange = _ref.onConfigurationChange,
      onCreate = _ref.onCreate,
      onRemove = _ref.onRemove,
      onSort = _ref.onSort,
      onToggleList = _ref.onToggleList,
      onReuse = _ref.onReuse;

  var buttonDefinition = (0, _lodash.find)(fieldDefinitions, function (_ref2) {
    var asButtons = _ref2.asButtons;
    return asButtons;
  });

  return _react2.default.createElement(
    _effektifFields.ProvideFieldsContext,
    { variables: variables },
    _react2.default.createElement(
      'div',
      style,
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'row-same-height' },
          _react2.default.createElement(
            'div',
            { className: 'col-sm-8' },
            _react2.default.createElement(
              'div',
              style('fieldsContainer'),
              _react2.default.createElement(
                'h5',
                style('heading'),
                (0, _signavioI18n2.default)('Fields')
              ),
              _react2.default.createElement(_EditorFields2.default, {
                fieldDefinitions: (0, _lodash.without)(fieldDefinitions, buttonDefinition),
                canToggleList: canToggleList,
                transformConfiguration: transformConfiguration,
                readOnly: readOnly,
                draggableSortableConnection: draggableSortableConnection,
                onConfigurationChange: onConfigurationChange,
                onRemove: onRemove,
                onSort: onSort,
                onToggleList: onToggleList
              }),
              buttonDefinition && _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_components.Divider, null),
                _react2.default.createElement(_FieldDefinition2.default, {
                  readOnly: true,
                  fieldDefinition: buttonDefinition
                })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            (0, _extends3.default)({}, style('paletteColumn'), {
              className: 'col-sm-4',
              id: stickyTargetId
            }),
            _react2.default.createElement(
              _reactStickynode2.default,
              { bottomBoundary: '#' + stickyTargetId },
              hasFieldReuse && _react2.default.createElement(
                _components.Disable,
                { disabled: readOnly },
                _react2.default.createElement(
                  'div',
                  style('fieldReuse'),
                  _react2.default.createElement(_FieldReuse2.default, {
                    canReuseBindable: canReuseBindable,
                    showNestedFields: reuseNestedFields,
                    onReuse: onReuse
                  })
                )
              ),
              _react2.default.createElement(
                _components.Disable,
                { disabled: readOnly },
                _react2.default.createElement(_Palette2.default, {
                  dataTypeDescriptors: dataTypeDescriptors,
                  draggableSortableConnection: draggableSortableConnection,
                  style: style('palette'),
                  onCreate: onCreate
                })
              )
            )
          )
        )
      )
    )
  );
};

exports.default = (0, _recompose.compose)((0, _recompose.withProps)(function () {
  return {
    draggableSortableConnection: new _components.DraggableSortableConnection(),
    stickyTargetId: (0, _lodash.uniqueId)('form-editor-view-sticky')
  };
}), (0, _recompose.withHandlers)({
  canToggleList: function (_canToggleList) {
    function canToggleList(_x) {
      return _canToggleList.apply(this, arguments);
    }

    canToggleList.toString = function () {
      return _canToggleList.toString();
    };

    return canToggleList;
  }(function (_ref3) {
    var canToggleList = _ref3.canToggleList;
    return function (fieldDefinition) {
      if ((0, _lodash.isFunction)(canToggleList) && !canToggleList(fieldDefinition)) {
        return false;
      }

      return true;
    };
  }),
  canReuseBindable: function canReuseBindable(_ref4) {
    var _canReuseBindable = _ref4.canReuseBindable,
        fieldDefinitions = _ref4.fieldDefinitions;
    return function (bindable) {
      var isUsed = (0, _lodash.find)(fieldDefinitions, function (_ref5) {
        var binding = _ref5.binding;
        return binding.expression === bindable.expression;
      });

      if (isUsed) {
        return false;
      }

      if ((0, _lodash.isFunction)(_canReuseBindable) && !_canReuseBindable(bindable)) {
        return false;
      }
      return true;
    };
  },
  onRemove: function onRemove(_ref6) {
    var fieldDefinitions = _ref6.fieldDefinitions,
        _onRemove = _ref6.onRemove;
    return function (fieldDefinition) {
      return _onRemove((0, _lodash.without)(fieldDefinitions, fieldDefinition), fieldDefinition);
    };
  },
  onSort: function onSort(_ref7) {
    var fieldDefinitions = _ref7.fieldDefinitions,
        _onSort = _ref7.onSort;
    return function (order) {
      var newOrder = order;
      var minIndex = (0, _lodash.min)(newOrder);
      if (minIndex !== 0) {
        // fix for jquery sortable bug on Chrome
        // (see https://github.com/effektif/client/issues/295)
        newOrder = order.map(function (index) {
          return index - minIndex;
        });
      }

      var asButtonsFields = fieldDefinitions.filter(function (fieldDefinition) {
        return fieldDefinition.asButtons;
      });
      var normalFields = (0, _lodash.difference)(fieldDefinitions, asButtonsFields);

      var orderedFields = newOrder.map(function (oldIndex) {
        return normalFields[oldIndex];
      }).concat(asButtonsFields); // always sort asButtons fields to the bottom

      _onSort(orderedFields);
    };
  },
  onConfigurationChange: function onConfigurationChange(_ref8) {
    var dataTypeDescriptors = _ref8.dataTypeDescriptors,
        variables = _ref8.variables,
        fieldDefinitions = _ref8.fieldDefinitions,
        _onConfigurationChange = _ref8.onConfigurationChange;
    return function (fieldDefinition, key, value) {
      _onConfigurationChange((0, _utils2.applyConfigurationChange)(dataTypeDescriptors, variables, fieldDefinition, key, value), key, value);
    };
  },
  onCreate: function onCreate(_ref9) {
    var _onCreate = _ref9.onCreate;
    return function (type, position) {
      var variable = {
        id: _utils.VariableUtils.provideId(),
        type: type,
        name: ''
      };

      var fieldDefinition = {
        id: _utils.VariableUtils.provideId(),
        binding: {
          expression: variable.id
        }
      };

      _onCreate(variable, fieldDefinition, position);
    };
  }
}), (0, _components.omitProps)(['onDocumentClick']), (0, _styles.defaultStyle)(function (_ref10) {
  var padding = _ref10.padding;
  return {
    heading: {
      marginBottom: padding.normal
    },
    fieldsContainer: {
      width: '100%',

      padding: padding.normal,

      backgroundColor: 'white'
    },

    paletteColumn: {
      position: 'relative',

      paddingLeft: 0
    },

    palette: {
      marginTop: padding.normal
    },

    '&withActiveField': {
      fieldReuse: {
        opacity: 0.25,
        pointerEvents: 'none',
        filter: 'blur(5px)'
      },

      palette: {
        opacity: 0.25,
        pointerEvents: 'none',
        filter: 'blur(5px)'
      }
    }
  };
}, function (_ref11) {
  var activeField = _ref11.activeField;
  return {
    '&withActiveField': activeField
  };
}))(FormEditor);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/FormEditor.js