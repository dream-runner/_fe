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

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LogEvent(_ref) {
  var children = _ref.children,
      event = _ref.event,
      markdown = _ref.markdown,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'event', 'markdown']);
  var logs = event.logs;


  return _react2.default.createElement(
    _Event2.default,
    (0, _extends3.default)({}, rest, { event: event }),
    children,
    logs && _react2.default.createElement(
      Logs,
      { markdown: markdown },
      logs
    )
  );
}

exports.default = LogEvent;


var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color;
  return {
    border: 'none',

    fontFamily: _styles.font.family.normal,
    fontSize: _styles.font.size.form,

    whiteSpace: 'normal',

    backgroundColor: color.mono.ultralight,

    padding: _styles.padding.normal
  };
});

var Logs = styled(function (_ref3) {
  var markdown = _ref3.markdown,
      children = _ref3.children,
      style = _ref3.style,
      rest = (0, _objectWithoutProperties3.default)(_ref3, ['markdown', 'children', 'style']);

  if (markdown) {
    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, rest, style),
      _react2.default.createElement(
        _components.Markdown,
        null,
        children
      )
    );
  }

  return _react2.default.createElement(
    'pre',
    rest,
    children
  );
});


// WEBPACK FOOTER //
// ./packages/events/lib/LogEvent.js