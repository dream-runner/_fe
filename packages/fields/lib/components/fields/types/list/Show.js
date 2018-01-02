'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _components = require('@signavio/effektif-commons/lib/components');

var _hints = require('@signavio/effektif-commons/lib/components/hints');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _Show = require('../../Show');

var _Show2 = _interopRequireDefault(_Show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShowDefault = function ShowDefault(_ref) {
  var value = _ref.value,
      type = _ref.type,
      small = _ref.small,
      transparent = _ref.transparent;
  return _react2.default.createElement(
    _components.List,
    null,
    value.map(function (item, i) {
      return _react2.default.createElement(_Show2.default, (0, _extends3.default)({ small: small, transparent: transparent }, {
        key: JSON.stringify(item) + '-' + i,
        value: item,
        type: type.elementType
      }));
    })
  );
};

var ShowForceSingleLine = function ShowForceSingleLine(props) {
  return _react2.default.createElement(
    _components.Popover,
    { trigger: 'click', popover: _react2.default.createElement(ShowDefault, props) },
    _react2.default.createElement(
      _tiles.TextTile,
      {
        small: props.small,
        transparent: props.transparent,
        style: { cursor: 'pointer' }
      },
      _react2.default.createElement(
        _hints.Hint,
        { inline: true },
        (0, _signavioI18n2.default)('Multiple values'),
        _react2.default.createElement(
          _components.ContextHelp,
          null,
          (0, _signavioI18n2.default)('Click to show or hide the list of all values.')
        )
      )
    )
  );
};

var Show = function Show(_ref2) {
  var forceSingleLine = _ref2.forceSingleLine,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['forceSingleLine']);
  return forceSingleLine ? _react2.default.createElement(ShowForceSingleLine, rest) : _react2.default.createElement(ShowDefault, rest);
};

exports.default = Show;


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/list/Show.js