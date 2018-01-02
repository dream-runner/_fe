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

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CaseCancel(_ref) {
  var event = _ref.event,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['event']);

  return _react2.default.createElement(
    _workflowEvents2.default,
    (0, _extends3.default)({}, rest, {
      important: true,
      expanded: true,
      event: event,
      title: (0, _signavioI18n2.default)('This case has been canceled'),
      icon: 'close-case'
    }),
    _react2.default.createElement(
      _components.Markdown,
      { style: rest.style('content') },
      event.reason
    )
  );
}


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var padding = _ref2.padding,
      color = _ref2.color;
  return {
    content: {
      padding: padding.normal,
      backgroundColor: color.mono.ultralight
    }
  };
});

exports.default = styled(CaseCancel);


// WEBPACK FOOTER //
// ./packages/cases/lib/events/case/Cancel.js