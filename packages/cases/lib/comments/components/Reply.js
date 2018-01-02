'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _effektifApi = require('@signavio/effektif-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Reply(_ref) {
  var reply = _ref.reply,
      style = _ref.style;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _workflowOrganizations.UserTile,
      {
        small: true,
        transparent: true,
        user: reply.user,
        toolbar: _react2.default.createElement(_components.Time, (0, _extends3.default)({ hideIcon: true }, style('time'), { time: reply.time }))
      },
      (0, _signavioI18n2.default)('__user__ replied', {
        user: _effektifApi.userUtils.name(reply.user)
      })
    ),
    _react2.default.createElement(
      _components.MarkdownMentions,
      { style: style('comment') },
      reply.message
    )
  );
}

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color;
  return {
    backgroundColor: null,

    avatar: {
      marginRight: _styles.padding.small
    },

    time: {
      cursor: 'default',

      display: 'inline-block',

      fontSize: _styles.font.size.xsmall,
      color: color.mono.lighter
    },

    comment: {
      marginTop: _styles.padding.small,

      mention: {
        backgroundColor: color.primary.light
      }
    }
  };
});

exports.default = styled(Reply);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/Reply.js