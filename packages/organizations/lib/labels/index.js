'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = exports.LabelSuggestionsView = exports.MainView = undefined;

var _components = require('./components');

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});

var _MainView2 = require('./containers/MainView');

var _MainView3 = _interopRequireDefault(_MainView2);

var _LabelSuggestionsView2 = require('./containers/LabelSuggestionsView');

var _LabelSuggestionsView3 = _interopRequireDefault(_LabelSuggestionsView2);

var _Label2 = require('./containers/Label');

var _Label3 = _interopRequireDefault(_Label2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.MainView = _MainView3.default;
exports.LabelSuggestionsView = _LabelSuggestionsView3.default;
exports.Label = _Label3.default;


// WEBPACK FOOTER //
// ./packages/organizations/lib/labels/index.js