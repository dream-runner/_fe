'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.cls = cls;
exports.knows = knows;

var _lodash = require('lodash');

var _TransitionUtils = require('./css/TransitionUtils');

var TransitionUtils = _interopRequireWildcard(_TransitionUtils);

var _PrintUtils = require('./css/PrintUtils');

var PrintUtils = _interopRequireWildcard(_PrintUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VENDORS = ['-webkit-', '-khtml-', '-moz-', '-ms-', '-o-', ''];

function cls(info) {
  var classes = {};

  if (typeof info === 'string') {
    var _key = info;

    classes[_key] = true;
  } else {
    classes = info;
  }

  classes = (0, _extends4.default)({}, classes, (0, _lodash.toArray)(arguments).slice(1).reduce(function (result, key) {
    return key ? (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, key, true)) : result;
  }, {}));

  return (0, _lodash.reduce)(classes, function (result, enabled, cls) {
    return enabled ? [].concat((0, _toConsumableArray3.default)(result), [cls]) : result;
  }, []).join(' ');
}

var events = exports.events = {
  transition: TransitionUtils,
  print: PrintUtils
};

function knows(property, value) {
  var noFuckingIE =
  //non-IE browsers, including ancient IEs
  document.documentMode === undefined ||
  //IE compatibility mode
  document.documentMode > 9;

  if (document.documentMode && document.documentMode <= 10) {
    // IEs < 11 actually don't support pointer-events, but this function still
    // returns true without this hack
    if (property === 'pointer-events' || property === 'pointerEvents') {
      return false;
    }
  }

  if (!noFuckingIE) {
    return false;
  }

  var variations = VENDORS.map(function (browser) {
    return browser + property;
  });

  var detect = document.createElement('div');

  return !!(0, _lodash.find)(variations, function (variation) {
    var finalValue = value || 'inital';

    detect.style.setProperty(variation, finalValue);

    return !!detect.style.getPropertyValue(variation);
  });
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/CSSUtils.js