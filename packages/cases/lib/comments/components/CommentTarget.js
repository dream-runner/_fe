'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _CommentHint = require('./CommentHint');

var _CommentHint2 = _interopRequireDefault(_CommentHint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CommentTarget(_ref) {
  var value = _ref.value,
      canCommentOnTask = _ref.canCommentOnTask,
      style = _ref.style,
      onChange = _ref.onChange,
      onSelectionChange = _ref.onSelectionChange;

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      'h5',
      style('title'),
      (0, _signavioI18n2.default)('You are commenting on')
    ),
    _react2.default.createElement(
      _components.TabBar,
      null,
      _react2.default.createElement(
        _components.Tab,
        {
          small: true,
          active: value === 'case',
          onClick: function onClick() {
            return onSelectionChange('case');
          }
        },
        (0, _signavioI18n2.default)('The current case')
      ),
      _react2.default.createElement(
        _components.Tab,
        {
          small: true,
          style: style('tab'),
          active: value === 'task',
          onClick: function onClick() {
            return onSelectionChange('task');
          }
        },
        (0, _signavioI18n2.default)('The current task')
      )
    ),
    _react2.default.createElement(_CommentHint2.default, { commentOnTask: value === 'task' })
  );
}

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var padding = _ref2.padding,
      font = _ref2.font,
      color = _ref2.color;
  return {
    fontSize: font.size.form,

    title: {
      fontFamily: font.family.normal,
      marginBottom: padding.small
    },
    '&disabled': {
      tab: {
        opacity: 0.5,
        cursor: null
      }
    }
  };
}, function (_ref3) {
  var canCommentOnTask = _ref3.canCommentOnTask;
  return {
    '&disabled': !canCommentOnTask
  };
});

exports.default = (0, _recompose.compose)((0, _recompose.withHandlers)({
  onSelectionChange: function onSelectionChange(_ref4) {
    var onChange = _ref4.onChange,
        canCommentOnTask = _ref4.canCommentOnTask;
    return function (target) {
      if (!canCommentOnTask) return;
      onChange(target);
    };
  }
}), styled)(CommentTarget);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/CommentTarget.js