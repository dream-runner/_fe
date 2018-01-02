'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _tiles = require('../../tiles');

var _styles = require('../../../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders a stack trace which is part of a log message.
 */
function StackTrace(_ref) {
  var model = _ref.model,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['model']);

  return _react2.default.createElement(
    _tiles.Tile,
    { style: rest.style('content') },
    _react2.default.createElement(
      'pre',
      rest.style('stacktrace'),
      model
    )
  );
}

StackTrace.propTypes = {
  model: _propTypes2.default.string
};

var styled = (0, _styles.defaultStyle)(function (theme) {
  return {
    content: {
      padding: _styles.padding.normal
    },
    stacktrace: (0, _extends3.default)({
      padding: _styles.padding.normal,
      backgroundColor: (0, _color2.default)(theme.color.mono.light).lighten(0.1).string()
    }, _styles.utils.border('1px', 'solid', theme.color.mono.lighter))
  };
});

exports.default = styled(StackTrace);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/logs/extensions/StackTrace.js