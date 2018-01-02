'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModifiers = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _effektifApi = require('@signavio/effektif-api');

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserTile(props) {
  var user = props.user,
      children = props.children,
      header = props.header,
      icon = props.icon,
      small = props.small,
      disabled = props.disabled,
      circular = props.circular,
      rest = (0, _objectWithoutProperties3.default)(props, ['user', 'children', 'header', 'icon', 'small', 'disabled', 'circular']);


  return _react2.default.createElement(
    _tiles.TextTile,
    (0, _extends3.default)({}, rest, {
      small: small,
      icon: icon,
      header: !icon && (0, _lodash.compact)([header, _react2.default.createElement(_Avatar2.default, {
        key: 'avatar',
        circular: circular,
        style: rest.style('avatar'),
        disabled: disabled,
        small: small,
        user: user
      })])
    }),
    children || _effektifApi.userUtils.name(user)
  );
}

var getModifiers = exports.getModifiers = function getModifiers(props) {
  return {
    '&withHeader': !!props.header
  };
};

var styled = (0, _styles.defaultStyle)({
  '&withHeader': {
    avatar: {
      float: 'left'
    }
  }
}, getModifiers);

exports.default = styled(UserTile);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/UserTile.js