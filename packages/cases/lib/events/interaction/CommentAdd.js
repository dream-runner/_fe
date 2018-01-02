'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = CommentAddEvent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

var _effektifApi = require('@signavio/effektif-api');

var _components = require('../../comments/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CommentAddEvent(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);
  var caseId = event.caseId,
      id = event.id,
      message = event.message,
      _event$childrenIds = event.childrenIds,
      childrenIds = _event$childrenIds === undefined ? [] : _event$childrenIds,
      actor = event.actor;


  return _react2.default.createElement(
    _workflowEvents2.default,
    (0, _extends3.default)({}, rest, {
      expanded: true,
      important: true,
      event: event,
      title: (0, _signavioI18n2.default)('__user__ left a comment', {
        user: _effektifApi.userUtils.name(actor)
      })
    }),
    _react2.default.createElement(_components.CommentContent, {
      caseId: caseId,
      comment: {
        id: id,
        message: message,
        childrenIds: childrenIds
      }
    })
  );
}


// WEBPACK FOOTER //
// ./packages/cases/lib/events/interaction/CommentAdd.js