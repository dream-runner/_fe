'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _reactMentions = require('react-mentions');

var _lodash = require('lodash');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _ShortcutSuggestion = require('./ShortcutSuggestion');

var _ShortcutSuggestion2 = _interopRequireDefault(_ShortcutSuggestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: fix that
// import { getUsersFromLocalCache } from '../../../../../users/utils'

function CommentInput(_ref) {
  var children = _ref.children,
      style = _ref.style,
      value = _ref.value,
      description = _ref.description,
      placeholder = _ref.placeholder,
      participants = _ref.participants,
      onChange = _ref.onChange,
      onComplete = _ref.onComplete,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'style', 'value', 'description', 'placeholder', 'participants', 'onChange', 'onComplete']);

  return _react2.default.createElement(
    _workflowOrganizations.UserMentionsInput,
    (0, _extends3.default)({}, style, {
      value: value,
      onChange: onChange,
      onComplete: onComplete,
      description: description,
      placeholder: placeholder,
      participants: participants
    }, rest),
    _react2.default.createElement(_reactMentions.Mention, {
      style: style('mention'),
      type: 'shortcut',
      trigger: '@',
      data: matchData,
      renderSuggestion: function renderSuggestion(suggestion) {
        return _react2.default.createElement(
          _ShortcutSuggestion2.default,
          { index: suggestion.id },
          suggestion.display
        );
      }
    }),
    children
  );
}


var isIncluded = function isIncluded(value, other) {
  return (0, _lodash.toLower)(value).indexOf((0, _lodash.toLower)(other)) === 0;
};

var matchData = function matchData(search) {
  return (0, _lodash.reduce)((0, _ShortcutSuggestion.descriptions)(), function (data, _ref2, id) {
    var display = _ref2.display;

    if (!isIncluded(display, search)) {
      return data;
    }

    return [].concat((0, _toConsumableArray3.default)(data), [{ display: display, id: id }]);
  }, []);
};

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (_ref3) {
  var color = _ref3.color;
  return {
    mention: {
      backgroundColor: color.primary.light
    }
  };
}))(CommentInput);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/CommentInput.js