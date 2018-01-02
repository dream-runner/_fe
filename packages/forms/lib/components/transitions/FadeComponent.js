'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

var _lodash = require('lodash');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FadeElement(_ref) {
  var children = _ref.children,
      style = _ref.style;

  return _react2.default.createElement(
    'div',
    style,
    children
  );
}

exports.default = (0, _recompose.compose)((0, _recompose.withState)('highlight', 'toggleHighlight', false), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(_ref2) {
    var required = _ref2.required;

    var willBecomeMandatory = !this.props.required && required;
    if (willBecomeMandatory) {
      var debouncedHighlightOn = (0, _lodash.debounce)(this.props.toggleHighlight, 500);
      var debouncedHighlightOff = (0, _lodash.debounce)(this.props.toggleHighlight, 2000);
      debouncedHighlightOn(true);
      debouncedHighlightOff(false);
    }
  }
}), (0, _styles.defaultStyle)(function (_ref3) {
  var color = _ref3.color;
  return (0, _extends3.default)({}, _styles.utils.transition(['background', 'max-height', 'opacity'], 'ease-in-out'), {
    backgroundColor: 'transparent',
    wordWrap: 'break-word',
    maxHeight: 0,
    marginTop: -1,
    opacity: 0,
    overflow: 'hidden',

    '&fadeIn': {
      maxHeight: null,
      marginTop: 0,
      opacity: 1
    },

    '&highlight': {
      backgroundColor: color.primary.light
    },

    ':hover': {
      overflow: 'visible'
    }
  });
}, function (_ref4) {
  var highlight = _ref4.highlight,
      state = _ref4.state;
  return {
    '&fadeIn': (0, _lodash.includes)(['entered', 'entering'], state),
    '&highlight': highlight
  };
}))(FadeElement);


// WEBPACK FOOTER //
// ./packages/forms/lib/components/transitions/FadeComponent.js