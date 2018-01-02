'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _recompose = require('recompose');

var _effektifApi = require('@signavio/effektif-api');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.compose)(_effektifApi.withUserPreferences, _effektifApi.withUser, (0, _effektifApi.connect)(function (_ref) {
  var user = _ref.user;
  return {
    updatePreferences: {
      id: user.id,
      type: _effektifApi.types.USER_PREFERENCE,
      method: 'update'
    }
  };
}), (0, _recompose.withState)('panel', 'setPanel', function (_ref2) {
  var userPreferences = _ref2.userPreferences;
  return window.matchMedia('(max-width: ' + _styles.utils.media.smMax + 'px)').matches ? null : userPreferences.showCaseInfo;
}), (0, _recompose.withHandlers)({
  onPanelChange: function onPanelChange(_ref3) {
    var updatePreferences = _ref3.updatePreferences,
        userPreferences = _ref3.userPreferences,
        setPanel = _ref3.setPanel,
        panel = _ref3.panel;
    return function (item) {
      // user clicked on the category that is actually active but hidden
      // because we're in a mobile environment
      if (!panel && item === userPreferences.showCaseInfo) {
        setPanel(item);

        return;
      }

      var showCaseInfo = item === userPreferences.showCaseInfo ? null : item;

      setPanel(showCaseInfo);

      updatePreferences((0, _extends3.default)({}, userPreferences, {
        showCaseInfo: showCaseInfo
      }));
    };
  }
}));


// WEBPACK FOOTER //
// ./packages/cases/lib/components/higher-order/withPanelHandling.js