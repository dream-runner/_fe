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

var _effektifApi = require('@signavio/effektif-api');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserAvatar(_ref) {
  var user = _ref.user,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['user']);

  if (user.error) {
    return _react2.default.createElement(
      _tiles.TextTile,
      rest,
      _react2.default.createElement(
        _hints.Hint,
        { danger: true, inline: true },
        (0, _signavioI18n2.default)('Failed to load user.')
      )
    );
  }

  if (user.pending || !user.value) {
    return _react2.default.createElement(_components.Spinner, null);
  }

  return _react2.default.createElement(_Avatar2.default, (0, _extends3.default)({}, rest, { user: user.value }));
}


var enhance = (0, _effektifApi.connect)(function (_ref2) {
  var value = _ref2.value;
  return {
    user: {
      type: _effektifApi.types.USER,
      id: value
    }
  };
});

exports.default = enhance(UserAvatar);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/UserAvatar.js