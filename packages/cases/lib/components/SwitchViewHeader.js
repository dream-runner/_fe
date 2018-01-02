'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _reactRouter = require('react-router');

var _effektifApi = require('@signavio/effektif-api');

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SwitchViewHeader(_ref) {
  var userPreferences = _ref.userPreferences,
      style = _ref.style,
      location = _ref.location,
      feedback = _ref.feedback,
      onFeedbackClick = _ref.onFeedbackClick,
      onGoBackClick = _ref.onGoBackClick;

  return _react2.default.createElement(
    'div',
    style,
    userPreferences.newCaseViewFeedbackGiven ? _react2.default.createElement(
      _buttons.LinkButton,
      { onClick: onGoBackClick, style: style('linkButton') },
      (0, _signavioI18n2.default)('Go back to old layout')
    ) : _react2.default.createElement(
      _components.Popover,
      {
        placement: 'top',
        popover: _react2.default.createElement(
          'div',
          null,
          (0, _signavioI18n2.default)("We kindly ask you to provide us some feedback about this new layout. Don't worry, you can skip it if you want.")
        ),
        showDelay: 0
      },
      _react2.default.createElement(
        _buttons.LinkButton,
        { onClick: onGoBackClick, style: style('linkButton') },
        (0, _signavioI18n2.default)('Go back to old layout')
      )
    ),
    ' | ',
    _react2.default.createElement(
      _buttons.LinkButton,
      { onClick: onFeedbackClick, style: style('linkButton') },
      (0, _signavioI18n2.default)('Give feedback')
    ),
    feedback && _react2.default.createElement(_effektifApi.Feedback, { page: location.pathname, onSubmit: onFeedbackClick })
  );
}

exports.default = (0, _recompose.compose)(_reactRouter.withRouter, _effektifApi.withUserPreferences, _effektifApi.withUser, (0, _recompose.withState)('useNewCaseView', 'toggleNewCaseView', true), (0, _recompose.withState)('feedback', 'toggleFeedback', false), (0, _effektifApi.connect)(function (_ref2) {
  var user = _ref2.user;
  return {
    updatePreferences: {
      id: user.id,
      type: _effektifApi.types.USER_PREFERENCE,
      method: 'update'
    }
  };
}), (0, _effektifApi.fulfillRequestThen)({
  updatePreferences: function updatePreferences(_ref3) {
    var useNewCaseView = _ref3.useNewCaseView,
        taskId = _ref3.taskId,
        caseId = _ref3.caseId,
        history = _ref3.history;

    if (!useNewCaseView) {
      if (taskId) {
        history.push((0, _effektifApi.prependOrg)('/case/' + caseId + '/task/' + taskId));
      } else {
        history.push((0, _effektifApi.prependOrg)('/case/' + caseId));
      }
    }
  }
}), (0, _recompose.withHandlers)({
  onFeedbackClick: function onFeedbackClick(_ref4) {
    var toggleFeedback = _ref4.toggleFeedback,
        userPreferences = _ref4.userPreferences,
        caseId = _ref4.caseId,
        taskId = _ref4.taskId,
        history = _ref4.history,
        feedback = _ref4.feedback;
    return function () {
      toggleFeedback(!feedback);
      // Redirects the user to the old case view if its the first time the user is on the page, can be removed when the old detail view is being removed.
      if (!userPreferences.useNewCaseView) {
        history.push((0, _effektifApi.prependOrg)('/case/' + caseId + '/task/' + taskId));
      }
    };
  },
  onGoBackClick: function onGoBackClick(_ref5) {
    var toggleFeedback = _ref5.toggleFeedback,
        toggleNewCaseView = _ref5.toggleNewCaseView,
        updatePreferences = _ref5.updatePreferences,
        userPreferences = _ref5.userPreferences;
    return function () {
      if (!userPreferences.newCaseViewFeedbackGiven) {
        updatePreferences({
          newCaseViewFeedbackGiven: true,
          useNewCaseView: false
        });

        toggleFeedback(true);

        return;
      }

      toggleNewCaseView(false);

      updatePreferences({
        useNewCaseView: false
      });
    };
  }
}), (0, _styles.defaultStyle)(function (_ref6) {
  var font = _ref6.font;
  return {
    linkButton: {
      fontSize: font.size.form,
      textDecoration: 'underline'
    }
  };
}))(SwitchViewHeader);


// WEBPACK FOOTER //
// ./packages/cases/lib/components/SwitchViewHeader.js