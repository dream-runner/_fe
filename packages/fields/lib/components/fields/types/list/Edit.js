'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _reactSortableHoc = require('react-sortable-hoc');

var _reactForms = require('@signavio/react-forms');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _Show = require('../../Show');

var _Show2 = _interopRequireDefault(_Show);

var _AddItem = require('./AddItem');

var _AddItem2 = _interopRequireDefault(_AddItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortableList = (0, _reactSortableHoc.sortableContainer)('div');
var SortHandle = (0, _reactSortableHoc.sortableHandle)(_components.DragHandle);

var EditItem = (0, _reactSortableHoc.sortableElement)(function (_ref) {
  var value = _ref.value,
      type = _ref.type,
      onRemove = _ref.onRemove;
  return _react2.default.createElement(
    'div',
    {
      style: {
        zIndex: 1,
        marginBottom: 1
      }
    },
    _react2.default.createElement(
      _tiles.Tile,
      { header: _react2.default.createElement(SortHandle, null), toolbar: _react2.default.createElement(_buttons.RemoveButton, { onClick: onRemove }) },
      _react2.default.createElement(_Show2.default, { value: value, type: type })
    )
  );
});

var Edit = function Edit(_ref2) {
  var type = _ref2.type,
      value = _ref2.value,
      onAdd = _ref2.onAdd,
      onChange = _ref2.onChange,
      onReorder = _ref2.onReorder,
      shouldAutoFocus = _ref2.shouldAutoFocus;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      SortableList,
      { lockAxis: 'y', useDragHandle: true, onSortEnd: onReorder },
      (0, _lodash.map)(value, function (item, i) {
        return _react2.default.createElement(EditItem, {
          value: item,
          key: JSON.stringify(item) + '-' + i,
          index: i,
          type: type.elementType,
          onRemove: function onRemove() {
            return onChange([].concat((0, _toConsumableArray3.default)(value.slice(0, i)), (0, _toConsumableArray3.default)(value.slice(i + 1))));
          }
        });
      })
    ),
    _react2.default.createElement(_AddItem2.default, {
      key: (0, _lodash.isNil)(value) ? 0 : value.length,
      autoFocus: shouldAutoFocus,
      type: type.elementType,
      onComplete: onAdd
    })
  );
};

exports.default = (0, _recompose.compose)(_reactForms.triggerOnCompleteOnChange, (0, _recompose.withState)('shouldAutoFocus', 'setShouldAutoFocus', false), (0, _recompose.withHandlers)({
  onAdd: function onAdd(_ref3) {
    var onChange = _ref3.onChange,
        setShouldAutoFocus = _ref3.setShouldAutoFocus,
        type = _ref3.type,
        value = _ref3.value;
    return function (newItem) {
      if ((0, _lodash.isNil)(newItem)) {
        return false;
      }

      var trimmedValue = (0, _lodash.isString)(newItem) ? (0, _lodash.trim)(newItem) : newItem;

      if (trimmedValue === '') {
        return false;
      }

      if (type.unique && (0, _lodash.includes)(value, trimmedValue)) {
        return false;
      }

      onChange([].concat((0, _toConsumableArray3.default)(value || []), [trimmedValue]));
      setShouldAutoFocus(true);

      return true;
    };
  },
  onReorder: function onReorder(_ref4) {
    var onChange = _ref4.onChange,
        value = _ref4.value;
    return function (_ref5) {
      var oldIndex = _ref5.oldIndex,
          newIndex = _ref5.newIndex;

      onChange((0, _reactSortableHoc.arrayMove)(value, oldIndex, newIndex));
    };
  }
}))(Edit);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/list/Edit.js