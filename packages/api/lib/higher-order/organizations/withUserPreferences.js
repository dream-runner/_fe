'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = withUserPreferences;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _apiTypes = require('../../apiTypes');

var _apiTypes2 = _interopRequireDefault(_apiTypes);

var _api = require('../../api');

var _withUser = require('./withUser');

var _withUser2 = _interopRequireDefault(_withUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withUserPreferences(WrappedCompoent) {
  function UserPreferences(_ref) {
    var fetchPreferences = _ref.fetchPreferences,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['fetchPreferences']);

    if (fetchPreferences.pending) {
      return null;
    }

    if (fetchPreferences.rejected) {
      return _react2.default.createElement(
        _hints.Hint,
        { danger: true },
        (0, _signavioI18n2.default)('Could not load user preferences for the following reason: __reason__', {
          reason: fetchPreferences.reason
        })
      );
    }

    return _react2.default.createElement(WrappedCompoent, (0, _extends3.default)({ userPreferences: fetchPreferences.value }, rest));
  }

  return (0, _recompose.compose)(_withUser2.default, (0, _api.connect)(function (_ref2) {
    var user = _ref2.user;
    return {
      fetchPreferences: {
        id: user.id,
        type: _apiTypes2.default.USER_PREFERENCE
      }
    };
  }))(UserPreferences);
}


// WEBPACK FOOTER //
// ./packages/api/lib/higher-order/organizations/withUserPreferences.js