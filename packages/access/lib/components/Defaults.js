'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Defaults;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Defaults(_ref) {
  var defaults = _ref.defaults;

  return _react2.default.createElement(
    _components.List,
    null,
    defaults.map(function (entry, index) {
      return _react2.default.createElement(
        _tiles.TextTile,
        {
          key: index,
          iconSet: 'fontAwesome',
          icon: !entry.icon ? 'info' : entry.icon
        },
        entry.title
      );
    })
  );
}


// WEBPACK FOOTER //
// ./packages/access/lib/components/Defaults.js