'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = HelpIcon;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('@signavio/effektif-commons/lib/components');

var _Help = require('./Help');

var _Help2 = _interopRequireDefault(_Help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HelpIcon(_ref) {
  var right = _ref.right,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['right']);

  return _react2.default.createElement(
    _components.Popover,
    {
      placement: 'top',
      showDelay: 0,
      popover: _react2.default.createElement(
        'div',
        { className: 'rights-help single' },
        _react2.default.createElement(_Help2.default, right)
      )
    },
    _react2.default.createElement(_components.Icon, (0, _extends3.default)({}, rest, { iconSet: 'fontAwesome', icon: right.icon }))
  );
}


// WEBPACK FOOTER //
// ./packages/access/lib/components/header/HelpIcon.js