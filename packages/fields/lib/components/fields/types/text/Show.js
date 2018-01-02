'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Show = function Show(_ref) {
  var type = _ref.type,
      value = _ref.value,
      forceSingleLine = _ref.forceSingleLine,
      small = _ref.small,
      transparent = _ref.transparent,
      style = _ref.style;
  return type.multiLine && !forceSingleLine ? _react2.default.createElement(
    _components.CollapsedText,
    { style: style, length: 200 },
    value
  ) : _react2.default.createElement(
    _tiles.TextTile,
    { small: small, transparent: transparent },
    value
  );
};

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color;
  return {
    backgroundColor: color.mono.ultralight
  };
});

exports.default = styled(Show);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/text/Show.js