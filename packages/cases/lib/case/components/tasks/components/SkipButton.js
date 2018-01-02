'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _components = require('@signavio/effektif-commons/lib/components');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _SkipConfirmation = require('./SkipConfirmation');

var _SkipConfirmation2 = _interopRequireDefault(_SkipConfirmation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SkipButton(_ref) {
  var activityName = _ref.activityName,
      readOnly = _ref.readOnly,
      onSkip = _ref.onSkip,
      showSkipConfirmation = _ref.showSkipConfirmation,
      toggleSkipConfirmation = _ref.toggleSkipConfirmation;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _components.Popover,
      { popover: (0, _signavioI18n2.default)('Skip this action and continue'), small: true },
      _react2.default.createElement(_buttons.IconButton, {
        icon: 'skip-forward',
        readOnly: readOnly,
        onClick: toggleSkipConfirmation
      })
    ),
    showSkipConfirmation ? _react2.default.createElement(_SkipConfirmation2.default, {
      activityName: activityName,
      onConfirm: onSkip,
      onCancel: toggleSkipConfirmation
    }) : null
  );
}

exports.default = (0, _recompose.withState)('showSkipConfirmation', 'toggleSkipConfirmation', false)(SkipButton);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/tasks/components/SkipButton.js