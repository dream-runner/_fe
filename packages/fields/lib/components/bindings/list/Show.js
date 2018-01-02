'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _Binding = require('../Binding');

var _Binding2 = _interopRequireDefault(_Binding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Show = function Show(_ref) {
  var items = _ref.items;

  if (items.length === 0) {
    return _react2.default.createElement(
      _tiles.TextTile,
      null,
      _react2.default.createElement(
        _components.Empty,
        null,
        (0, _signavioI18n2.default)('No values set')
      )
    );
  }

  return _react2.default.createElement(
    _components.List,
    null,
    items.map(function (item, index) {
      return _react2.default.createElement(_Binding2.default, { readOnly: true, binding: item, key: index });
    })
  );
};
exports.default = Show;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/bindings/list/Show.js