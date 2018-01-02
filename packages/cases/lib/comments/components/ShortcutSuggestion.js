'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.descriptions = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _signavioI18n = require('signavio-i18n');

var _signavioI18n2 = _interopRequireDefault(_signavioI18n);

var _tiles = require('@signavio/effektif-commons/lib/components/tiles');

var _styles = require('@signavio/effektif-commons/lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Suggestion = function Suggestion(_ref) {
  var style = _ref.style,
      children = _ref.children,
      index = _ref.index;
  return _react2.default.createElement(
    _tiles.TextTile,
    {
      transparent: true,
      style: style,
      icon: 'at',
      subtitle: descriptions(index).description
    },
    children
  );
};

var descriptions = exports.descriptions = function descriptions(key) {
  var items = {
    all: {
      display: (0, _signavioI18n2.default)('All participants'),
      description: (0, _signavioI18n2.default)('Mention all participants of this case')
    },
    open: {
      display: (0, _signavioI18n2.default)('Open task assignees'),
      description: (0, _signavioI18n2.default)('Mention all users with open tasks')
    }
  };

  if (key) {
    return items[key];
  }

  return items;
};

var styled = (0, _styles.defaultStyle)(function (_ref2) {
  var color = _ref2.color;
  return {
    marginTop: 1,

    '&first': {
      marginTop: null
    }
  };
}, function (_ref3) {
  var index = _ref3.index;
  return {
    '&first': index === 0
  };
});

exports.default = styled(Suggestion);


// WEBPACK FOOTER //
// ./packages/cases/lib/comments/components/ShortcutSuggestion.js