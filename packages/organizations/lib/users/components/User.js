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

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _UserTile = require('./UserTile');

var _UserTile2 = _interopRequireDefault(_UserTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function User(_ref) {
  var fetchUser = _ref.fetchUser,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['fetchUser']);

  if (fetchUser.rejected) {
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

  if (fetchUser.pending || !fetchUser.value) {
    return _react2.default.createElement(
      _tiles.TextTile,
      rest,
      _react2.default.createElement(
        _hints.Hint,
        { loading: true, inline: true },
        (0, _signavioI18n2.default)('Loading user...')
      )
    );
  }

  var user = fetchUser.value;

  return _react2.default.createElement(_UserTile2.default, (0, _extends3.default)({ user: user, subtitle: user.emailAddress }, rest));
}

exports.default = (0, _recompose.compose)((0, _effektifApi.connect)(function (_ref2) {
  var value = _ref2.value;
  return {
    fetchUser: {
      type: _effektifApi.types.USER,
      id: value
    }
  };
}), (0, _components.omitProps)(['onComplete']))(User);


// WEBPACK FOOTER //
// ./packages/organizations/lib/users/components/User.js