'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _Binding = require('../Binding');

var _Binding2 = _interopRequireDefault(_Binding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Edit = function Edit(_ref) {
  var items = _ref.items,
      type = _ref.type,
      _ref$onAdd = _ref.onAdd,
      onAdd = _ref$onAdd === undefined ? function () {} : _ref$onAdd,
      _ref$onRemove = _ref.onRemove,
      onRemove = _ref$onRemove === undefined ? function () {} : _ref$onRemove,
      maxCount = _ref.maxCount,
      filterBindables = _ref.filterBindables;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _components.List,
      null,
      items.map(function (item, index) {
        return _react2.default.createElement(
          _tiles.Tile,
          {
            key: index,
            toolbar: _react2.default.createElement(_buttons.RemoveButton, {
              title: (0, _signavioI18n2.default)('Remove this binding'),
              onClick: function onClick() {
                return onRemove(index);
              }
            })
          },
          _react2.default.createElement(_Binding2.default, { readOnly: true, binding: item })
        );
      })
    ),
    (!maxCount || items.length < maxCount) && _react2.default.createElement(_Binding2.default, { type: type, onChange: onAdd, filterBindables: filterBindables })
  );
};

exports.default = Edit;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/list/Edit.js