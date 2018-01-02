'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = Show;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _buttons = require('@signavio/effektif-commons/lib/components/buttons');

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Show(_ref) {
  var asButtons = _ref.asButtons,
      value = _ref.value,
      type = _ref.type,
      small = _ref.small,
      transparent = _ref.transparent,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['asButtons', 'value', 'type', 'small', 'transparent']);

  var option = (0, _lodash.find)(type.options, { id: value });
  var displayValue = option && option.name ? option.name : value;

  if (value) {
    if (asButtons) {
      return _react2.default.createElement(
        _buttons.TextButton,
        { block: true, disabled: true },
        displayValue
      );
    }

    return _react2.default.createElement(
      _tiles.TextTile,
      (0, _extends3.default)({ small: small, transparent: transparent }, { title: displayValue }),
      displayValue
    );
  }

  return _react2.default.createElement(_ButtonGroup2.default, (0, _extends3.default)({}, rest, { readOnly: true, options: type.options }));
}


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/choice/Show.js