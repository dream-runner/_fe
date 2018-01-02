'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _HelpIcon = require('./HelpIcon');

var _HelpIcon2 = _interopRequireDefault(_HelpIcon);

var _Help = require('./Help');

var _Help2 = _interopRequireDefault(_Help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RightsHeader(_ref) {
  var readOnly = _ref.readOnly,
      definition = _ref.definition,
      style = _ref.style;

  return _react2.default.createElement(
    _tiles.TextTile,
    {
      style: style,
      transparent: true,
      toolbar: (0, _lodash.map)(definition.order, function (right) {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({ key: right }, style('icon')),
          _react2.default.createElement(_HelpIcon2.default, { right: definition.rights[right] })
        );
      })
    },
    readOnly ? (0, _signavioI18n2.default)('Review all access rights') : (0, _signavioI18n2.default)('Define the access for users and groups'),
    _react2.default.createElement(
      _components.ContextHelp,
      { placement: 'top' },
      _react2.default.createElement(
        'div',
        style('help'),
        (0, _lodash.map)(definition.order, function (right) {
          return _react2.default.createElement(_Help2.default, (0, _extends3.default)({ key: right }, definition.rights[right]));
        })
      )
    )
  );
}

var styled = (0, _styles.defaultStyle)(function (theme) {
  return (0, _extends3.default)({
    backgroundColor: null

  }, _styles.utils.borderTop('1px', 'solid', theme.color.mono.light), _styles.utils.borderLeft('1px', 'solid', theme.color.mono.light), _styles.utils.borderRight('1px', 'solid', theme.color.mono.light), {

    icon: (0, _extends3.default)({
      float: 'left'

    }, _styles.utils.borderLeft('1px', 'solid', theme.color.mono.light)),

    help: {
      width: 450
    }
  });
});

exports.default = styled(RightsHeader);


// WEBPACK FOOTER //
// ./packages/access/lib/components/header/Header.js