'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _workflowEvents = require('@signavio/workflow-events');

var _workflowEvents2 = _interopRequireDefault(_workflowEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SkipActivityInstance(_ref) {
  var event = _ref.event,
      style = _ref.style;
  var message = event.message,
      activityName = event.activityName;


  return _react2.default.createElement(
    _workflowEvents2.default,
    {
      event: (0, _lodash.omit)(event, 'actor'),
      title: (0, _signavioI18n2.default)('skipped action __name__', {
        name: activityName || (0, _signavioI18n2.default)('Unnamed action')
      }),
      icon: 'skip-forward'
    },
    message && _react2.default.createElement(
      _components.Markdown,
      { style: style('content') },
      message
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

exports.default = styled(SkipActivityInstance);


// WEBPACK FOOTER //
// ./packages/cases/lib/events/engine/SkipActivityInstance.js