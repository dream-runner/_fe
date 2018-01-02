'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _utils = require('@signavio/effektif-commons/lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// inner component


// exported (API) component


// used by handlers
function SkipConfirmation(_ref) {
  var activityName = _ref.activityName,
      message = _ref.message,
      onChange = _ref.onChange,
      onConfirm = _ref.onConfirm,
      onCancel = _ref.onCancel,
      onKeyDown = _ref.onKeyDown,
      style = _ref.style;

  var isValidMessage = message && message.length > 3;
  return _react2.default.createElement(
    _components.Confirm,
    (0, _extends3.default)({
      danger: true,
      title: (0, _signavioI18n2.default)('Skip action __name__?', { name: activityName }),
      onCancel: onCancel,
      onConfirm: onConfirm,
      disabled: !isValidMessage
    }, style),
    _react2.default.createElement(
      _components.Hint,
      { warning: true },
      (0, _signavioI18n2.default)('Are you sure you want to skip action __name__? The following actions will continue to be executed.', {
        name: activityName
      })
    ),
    _react2.default.createElement(
      'div',
      { className: 'control' },
      _react2.default.createElement('input', (0, _extends3.default)({
        autoFocus: true,
        type: 'text',
        placeholder: (0, _signavioI18n2.default)('Please enter the reason for skipping this action*'),
        onKeyDown: onKeyDown,
        onChange: onChange,
        value: message
      }, style('input')))
    )
  );
}

exports.default = (0, _recompose.compose)((0, _recompose.withState)('message', 'setMessage'), (0, _recompose.withHandlers)({
  onKeyDown: function onKeyDown(_ref2) {
    var message = _ref2.message,
        onConfirm = _ref2.onConfirm;
    return function (event) {
      if (_utils.KeyUtils.isEnter(event)) {
        onConfirm(message);
      }
    };
  },
  onConfirm: function (_onConfirm) {
    function onConfirm(_x) {
      return _onConfirm.apply(this, arguments);
    }

    onConfirm.toString = function () {
      return _onConfirm.toString();
    };

    return onConfirm;
  }(function (_ref3) {
    var message = _ref3.message,
        onConfirm = _ref3.onConfirm;
    return function () {
      onConfirm(message);
    };
  }),
  onCancel: function (_onCancel) {
    function onCancel(_x2) {
      return _onCancel.apply(this, arguments);
    }

    onCancel.toString = function () {
      return _onCancel.toString();
    };

    return onCancel;
  }(function (_ref4) {
    var onCancel = _ref4.onCancel;
    return function () {
      // required to ignore the click event in the arguments
      onCancel();
    };
  }),
  onChange: function onChange(_ref5) {
    var setMessage = _ref5.setMessage;
    return function (event) {
      setMessage(event.target.value);
    };
  }
}), (0, _components.omitProps)(['setMessage']), (0, _styles.defaultStyle)(function () {
  return {
    input: {
      width: '100%'
    }
  };
}))(SkipConfirmation);


// WEBPACK FOOTER //
// ./packages/cases/lib/case/components/tasks/components/SkipConfirmation.js