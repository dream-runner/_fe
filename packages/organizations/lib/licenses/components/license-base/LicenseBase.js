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

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LicenseBase(props) {
  var compact = props.compact,
      disabled = props.disabled,
      title = props.title,
      disabledHint = props.disabledHint,
      children = props.children,
      style = props.style,
      rest = (0, _objectWithoutProperties3.default)(props, ['compact', 'disabled', 'title', 'disabledHint', 'children', 'style']);


  if (compact) {
    return _react2.default.createElement(
      'div',
      style,
      _react2.default.createElement(
        'div',
        style('content'),
        _react2.default.createElement(
          'h4',
          style('header'),
          title
        )
      )
    );
  }

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      'h3',
      style('header'),
      title
    ),
    disabled ? _react2.default.createElement(
      _hints.Hint,
      { warning: true },
      _react2.default.createElement(
        _components.Markdown,
        null,
        disabledHint
      )
    ) : _react2.default.createElement(
      'div',
      (0, _extends3.default)({}, rest, style('content')),
      children
    )
  );
}
exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (theme) {
  return {
    header: {
      marginBottom: theme.padding.large,
      textAlign: 'center'
    },

    content: (0, _extends3.default)({
      padding: theme.padding.normal

    }, _styles.utils.border('1px', 'solid', theme.color.mono.light), _styles.utils.boxShadow()),

    '&compact': {
      header: {
        textAlign: 'center'
      },

      price: {
        fontSize: theme.font.size.normal
      }
    }
  };
}, function (_ref) {
  var condensed = _ref.condensed,
      compact = _ref.compact;
  return {
    '&condensed': condensed,
    '&compact': compact
  };
}), (0, _components.omitProps)(['condensed']))(LicenseBase);


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/components/license-base/LicenseBase.js