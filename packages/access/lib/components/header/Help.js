'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Help(_ref) {
  var icon = _ref.icon,
      title = _ref.title,
      description = _ref.description,
      style = _ref.style;

  return _react2.default.createElement(
    'div',
    style,
    _react2.default.createElement(
      _components.List,
      { direction: 'horizontal' },
      _react2.default.createElement(_components.Icon, { iconSet: 'fontAwesome', icon: icon }),
      _react2.default.createElement(
        'div',
        style('title'),
        (0, _signavioI18n2.default)('__title__ permission', {
          title: _react2.default.createElement(
            'q',
            null,
            title
          )
        }),
        description && ':'
      )
    ),
    description ? _react2.default.createElement(
      'div',
      style('description'),
      description
    ) : null
  );
}

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var font = _ref2.font,
      lineHeight = _ref2.lineHeight,
      padding = _ref2.padding;

  var titleTotalHeight = _styles.utils.calculateHeight(font.size.normal, lineHeight, padding.small);

  var titlePadding = _styles.utils.calculateVerticalPadding(titleTotalHeight, font.size.form, lineHeight);

  return {
    paddingBottom: padding.xsmall,
    paddingLeft: padding.xsmall,
    paddingRight: padding.xsmall,
    paddingTop: padding.xsmall,

    title: {
      fontSize: font.size.form,
      paddingBottom: titlePadding,
      paddingTop: titlePadding
    },

    description: {
      fontSize: font.size.small
    }
  };
});

exports.default = styled(Help);


// WEBPACK FOOTER //
// ./packages/access/lib/components/header/Help.js