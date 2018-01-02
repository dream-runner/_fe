'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemPure = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _components = require('@signavio/effektif-commons/lib/components');

var _LabelTile = require('./LabelTile');

var _LabelTile2 = _interopRequireDefault(_LabelTile);

var _Edit = require('./Edit');

var _Edit2 = _interopRequireDefault(_Edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemPure = function ItemPure(_ref) {
  var editing = _ref.editing,
      onToggle = _ref.onToggle,
      removeLabel = _ref.removeLabel,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['editing', 'onToggle', 'removeLabel', 'style']);

  if (editing) {
    return _react2.default.createElement(
      _tiles.Tile,
      null,
      _react2.default.createElement(_Edit2.default, (0, _extends3.default)({ onCancel: onToggle, onSave: onToggle }, rest))
    );
  }

  return _react2.default.createElement(
    _tiles.Tile,
    {
      toolbar: _react2.default.createElement(
        _components.List,
        { direction: 'horizontal' },
        _react2.default.createElement(_buttons.IconButton, { icon: 'pencil', iconSet: 'fontAwesome', onClick: onToggle }),
        _react2.default.createElement(_components.Remove, { onRemove: removeLabel })
      )
    },
    _react2.default.createElement(
      'div',
      style('labelContainer'),
      _react2.default.createElement(_LabelTile2.default, (0, _extends3.default)({}, rest, { onClick: onToggle, style: style('label') }))
    )
  );
};
exports.ItemPure = ItemPure;
exports.default = (0, _recompose.compose)((0, _recompose.withState)('editing', 'toggleEdit', false), (0, _recompose.withHandlers)({
  onToggle: function onToggle(_ref2) {
    var toggleEdit = _ref2.toggleEdit,
        editing = _ref2.editing;
    return function () {
      toggleEdit(!editing);
    };
  }
}), (0, _effektifApi.connect)(function (_ref3) {
  var id = _ref3.id;
  return {
    removeLabel: {
      type: _effektifApi.types.LABEL,
      method: 'remove',
      id: id
    }
  };
}), (0, _styles.defaultStyle)(function (theme) {
  var labelTotalHeight = _styles.utils.calculateHeight(theme.font.size.form, theme.lineHeight, theme.padding.xsmall);
  var padding = _styles.utils.calculateVerticalPadding(labelTotalHeight, theme.font.size.form, theme.lineHeight) + _LabelTile.BORDER_WIDTH / 2;

  return {
    labelContainer: {
      marginLeft: theme.padding.normal,
      paddingBottom: padding,
      paddingTop: padding
    }
  };
}))(ItemPure);


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/components/Item.js