'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _effektifFields = require('@signavio/effektif-fields');

var _FieldPreview = require('./FieldPreview');

var _FieldPreview2 = _interopRequireDefault(_FieldPreview);

var _FieldDefinitionIcon = require('./FieldDefinitionIcon');

var _FieldDefinitionIcon2 = _interopRequireDefault(_FieldDefinitionIcon);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FieldDefinitionTile(_ref) {
  var dataTypeDescriptors = _ref.dataTypeDescriptors,
      fieldDefinition = _ref.fieldDefinition,
      readOnly = _ref.readOnly,
      onClick = _ref.onClick,
      style = _ref.style,
      variables = _ref.variables;

  var fieldPreview = (0, _utils.resolvePreview)(fieldDefinition, dataTypeDescriptors, variables);

  var rootDescriptor = (0, _utils.resolveDescriptor)({ binding: _effektifFields.bindingUtils.getRoot(fieldDefinition.binding) }, dataTypeDescriptors, variables);

  return _react2.default.createElement(
    _tiles.Tile,
    {
      'data-dragHandle': true,
      header: !fieldDefinition.asButtons && _react2.default.createElement(
        _components.List,
        { direction: 'horizontal', onClick: onClick },
        !readOnly && _react2.default.createElement(_components.DragHandle, null),
        _react2.default.createElement(_FieldDefinitionIcon2.default, {
          customRules: fieldDefinition.customRules,
          deletedTypeDescriptor: rootDescriptor && rootDescriptor.deleted
        })
      ),
      style: style('tile')
    },
    _react2.default.createElement(
      'div',
      { style: { position: 'relative' } },
      _react2.default.createElement(_FieldPreview2.default, fieldPreview),
      _react2.default.createElement('div', (0, _extends3.default)({ onClick: onClick }, style('overlay')))
    )
  );
}
exports.default = (0, _recompose.compose)(_effektifFields.getFieldsContext, (0, _styles.defaultStyle)({
  tile: {
    position: 'relative'
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    cursor: 'pointer',
    zIndex: 1
  }
}))(FieldDefinitionTile);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/FieldDefinitionTile.js