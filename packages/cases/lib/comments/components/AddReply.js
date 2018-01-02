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

var _styles = require('@signavio/effektif-commons/lib/styles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _components = require('@signavio/effektif-commons/lib/components');

var _higherOrder = require('./higher-order');

var _CommentInput = require('./CommentInput');

var _CommentInput2 = _interopRequireDefault(_CommentInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AddReply(_ref) {
  var isBusy = _ref.isBusy,
      onReply = _ref.onReply,
      value = _ref.value,
      style = _ref.style,
      onChange = _ref.onChange,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['isBusy', 'onReply', 'value', 'style', 'onChange']);

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(_CommentInput2.default, (0, _extends3.default)({}, rest, {
      style: style('input'),
      value: value,
      onChange: onChange,
      markdown: false,
      readOnly: isBusy,
      placeholder: isBusy ? (0, _signavioI18n2.default)('Adding reply...') : (0, _signavioI18n2.default)('Reply to this comment')
    })),
    _react2.default.createElement(
      'div',
      style('buttonContainer'),
      _react2.default.createElement(
        _buttons.TextButton,
        {
          small: true,
          primary: true,
          disabled: !(value || '').trim(),
          onClick: onReply
        },
        (0, _signavioI18n2.default)('Submit reply')
      )
    )
  );
}
exports.default = (0, _recompose.compose)(_effektifApi.withUser, (0, _recompose.withState)('value', 'setValue', ''), (0, _recompose.withHandlers)({
  onReply: function (_onReply) {
    function onReply(_x) {
      return _onReply.apply(this, arguments);
    }

    onReply.toString = function () {
      return _onReply.toString();
    };

    return onReply;
  }(function (_ref2) {
    var value = _ref2.value,
        setValue = _ref2.setValue,
        onReply = _ref2.onReply;
    return function () {
      onReply(value.trim());

      setValue('');
    };
  }),
  onChange: function onChange(_ref3) {
    var setValue = _ref3.setValue;
    return function (_ref4) {
      var target = _ref4.target;
      return setValue(target.value);
    };
  }
}), (0, _recompose.withHandlers)({
  onComplete: function onComplete(_ref5) {
    var onReply = _ref5.onReply;
    return onReply;
  }
}), _higherOrder.triggerOnCompleteOnShiftEnter, (0, _styles.defaultStyle)(function (_ref6) {
  var font = _ref6.font,
      padding = _ref6.padding;
  return {
    input: {
      backgroundColor: 'white',
      zIndex: 2,

      input: {
        fontSize: font.size.small,

        minHeight: 40
      }
    },

    buttonContainer: {
      marginTop: padding.small,

      textAlign: 'right'
    }
  };
}), (0, _components.omitProps)(['setValue']))(AddReply);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/AddReply.js