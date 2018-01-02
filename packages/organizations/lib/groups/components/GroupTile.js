'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = GroupTile;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GroupTile(props) {
  var group = props.group,
      rest = (0, _objectWithoutProperties3.default)(props, ['group']);


  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({}, rest, { icon: 'group' }),
    group.name
  );
}


// WEBPACK FOOTER //
// ./packages/organizations/lib/groups/components/GroupTile.js