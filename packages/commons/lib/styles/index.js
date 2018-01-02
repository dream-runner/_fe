'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theme = exports.font = exports.padding = exports.variables = exports.ThemeProvider = exports.defaultStyle = exports.getTheme = exports.utils = undefined;

var _ui = require('@signavio/ui');

Object.defineProperty(exports, 'utils', {
  enumerable: true,
  get: function get() {
    return _ui.styles;
  }
});
Object.defineProperty(exports, 'getTheme', {
  enumerable: true,
  get: function get() {
    return _ui.getTheme;
  }
});
Object.defineProperty(exports, 'defaultStyle', {
  enumerable: true,
  get: function get() {
    return _ui.defaultStyle;
  }
});
Object.defineProperty(exports, 'ThemeProvider', {
  enumerable: true,
  get: function get() {
    return _ui.ThemeProvider;
  }
});

var _defaultTheme = require('@signavio/ui/lib/styles/defaultTheme');

var defaultTheme = _interopRequireWildcard(_defaultTheme);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var variables = exports.variables = {
  lineHeight: {
    clear: 1.5,
    block: 40,
    small: 26
  }
};

var padding = exports.padding = defaultTheme.padding;
var font = exports.font = defaultTheme.font;
var theme = exports.theme = {
  color: defaultTheme.color
};


// WEBPACK FOOTER //
// ./packages/commons/lib/styles/index.js