'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoverTextTile = (0, _components.withPopover)(_tiles.TextTile);

var PaletteItem = function PaletteItem(_ref) {
  var onClick = _ref.onClick,
      style = _ref.style,
      typeDescriptor = _ref.typeDescriptor,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['onClick', 'style', 'typeDescriptor']);
  return _react2.default.createElement(
    _components.Draggable,
    (0, _extends3.default)({}, rest, style, { helper: 'clone' }),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        PopoverTextTile,
        {
          icon: typeDescriptor.deleted ? 'warning' : typeDescriptor.icon,
          onClick: onClick,
          popover: typeDescriptor.deleted && (0, _signavioI18n2.default)('This field has been deleted from connectors'),
          small: true,
          style: style('tile')
        },
        typeDescriptor.name
      )
    )
  );
};

var createType = function createType(typeDescriptor) {
  return {
    name: typeDescriptor.key,
    id: typeDescriptor.id,
    kind: typeDescriptor.kind
  };
};

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)({
  backgroundColor: 'white',
  cursor: 'pointer',

  tile: {
    backgroundColor: 'white',
    cursor: 'pointer'
  }
}), (0, _recompose.withHandlers)({
  onDrop: function onDrop(_ref2) {
    var onClick = _ref2.onClick,
        typeDescriptor = _ref2.typeDescriptor;
    return function (position) {
      if (typeDescriptor.deleted) {
        return;
      }

      onClick(createType(typeDescriptor), position);
    };
  },
  onClick: function (_onClick) {
    function onClick(_x) {
      return _onClick.apply(this, arguments);
    }

    onClick.toString = function () {
      return _onClick.toString();
    };

    return onClick;
  }(function (_ref3) {
    var onClick = _ref3.onClick,
        typeDescriptor = _ref3.typeDescriptor;
    return function () {
      if (typeDescriptor.deleted) {
        return;
      }

      onClick(createType(typeDescriptor));
    };
  })
}))(PaletteItem);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/PaletteItem.js