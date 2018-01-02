'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowGroupIdPure = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _effektifApi = require('@signavio/effektif-api');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _connectSpinning = require('../../higher-order/connectSpinning');

var _connectSpinning2 = _interopRequireDefault(_connectSpinning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectValue = (0, _connectSpinning2.default)(function (_ref) {
  var value = _ref.value;
  return {
    group: { type: _effektifApi.types.GROUP, id: value }
  };
});

var ShowGroupIdPure = exports.ShowGroupIdPure = function ShowGroupIdPure(_ref2) {
  var group = _ref2.group,
      small = _ref2.small,
      transparent = _ref2.transparent,
      highlightedName = _ref2.highlightedName;
  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({ icon: 'group' }, { small: small, transparent: transparent }),
    highlightedName || group.name
  );
};

exports.default = connectValue(ShowGroupIdPure);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/groupId/Show.js