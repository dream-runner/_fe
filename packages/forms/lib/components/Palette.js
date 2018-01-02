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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _PaletteItem = require('./PaletteItem');

var _PaletteItem2 = _interopRequireDefault(_PaletteItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Palette(props) {
  var connected = props.connected,
      standard = props.standard,
      style = props.style,
      draggableSortableConnection = props.draggableSortableConnection,
      onCreate = props.onCreate;

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      'h5',
      null,
      (0, _signavioI18n2.default)('Add a field')
    ),
    _react2.default.createElement(
      'div',
      style('fields'),
      _react2.default.createElement(
        _components.List,
        null,
        (0, _lodash.sortBy)(standard, function (typeDescriptor) {
          return typeDescriptor.name;
        }).map(function (typeDescriptor) {
          return _react2.default.createElement(_PaletteItem2.default, {
            sortableConnection: draggableSortableConnection,
            key: typeDescriptor.key,
            onClick: onCreate,
            typeDescriptor: typeDescriptor
          });
        })
      )
    ),
    connected.length > 0 && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_components.Divider, null),
      _react2.default.createElement(
        _components.List,
        null,
        (0, _lodash.sortBy)(connected, function (typeDescriptor) {
          return typeDescriptor.name;
        }).map(function (typeDescriptor) {
          return _react2.default.createElement(_PaletteItem2.default, {
            sortableConnection: draggableSortableConnection,
            key: typeDescriptor.id,
            onClick: onCreate,
            typeDescriptor: typeDescriptor
          });
        })
      )
    )
  );
}
exports.default = (0, _recompose.compose)((0, _recompose.withProps)(function (_ref) {
  var dataTypeDescriptors = _ref.dataTypeDescriptors;
  return {
    standard: dataTypeDescriptors.filter(function (typeDescriptor) {
      return !typeDescriptor.deleted && typeDescriptor.isInPalette;
    }),
    connected: dataTypeDescriptors.filter(function (typeDescriptor) {
      return !typeDescriptor.deleted && !!typeDescriptor.connectorId;
    })
  };
}), (0, _styles.defaultStyle)(function (_ref2) {
  var padding = _ref2.padding;
  return (0, _extends3.default)({}, _styles.utils.transition('opacity'), {

    fields: {
      marginTop: padding.normal
    }
  });
}))(Palette);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/Palette.js