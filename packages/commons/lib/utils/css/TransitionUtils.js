'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onEnd = onEnd;
exports.offEnd = offEnd;
exports.possible = possible;

var _compact = require('lodash/compact');

var _compact2 = _interopRequireDefault(_compact);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
    * React TransitionEvents
    *
    * Copyright 2013-2014 Facebook, Inc.
    * @licence https://github.com/facebook/react/blob/0.11-stable/LICENSE
    *
    * This file contains a modified version of:
    *  https://github.com/facebook/react/blob/0.11-stable/src/addons/transitions/ReactTransitionEvents.js
    *
    */

var isSafari = (window.navigator.vendor || '').indexOf('Apple Computer') >= 0;

/**
    * EVENT_NAME_MAP is used to determine which event fired when a
    * transition/animation ends, based on the style property used to
    * define that event.
    */
var EVENT_NAME_MAP = {
  transitionend: {
    transitionend: 'transition',
    webkitTransitionEnd: 'WebkitTransition',
    mozTransitionEnd: 'MozTransition',
    oTransitionEnd: 'OTransition',
    MSTransitionEnd: 'msTransition'
  },

  animationend: {
    animationend: 'animation',
    webkitAnimationEnd: 'WebkitAnimation',
    mozAnimationEnd: 'MozAnimation',
    oAnimationEnd: 'OAnimation',
    MSAnimationEnd: 'msAnimation'
  }
};

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are useable, and if not remove them
  // from the map
  if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  return (0, _compact2.default)((0, _map2.default)(EVENT_NAME_MAP, function (events) {
    return (0, _find2.default)((0, _keys2.default)(events), function (key) {
      return events[key] in style;
    });
  }));
}

var events = detectEvents();

function onEnd(node, handler) {
  if (events.length === 0) {
    return;
  }

  (0, _each2.default)(events, function (event) {
    node.addEventListener(event, handler, false);
  });
}
function offEnd(node, handler) {
  if (events.length === 0) {
    return;
  }

  (0, _each2.default)(events, function (event) {
    node.removeEventListener(event, handler, false);
  });
}
function possible() {
  return events.length > 0 && !isSafari;
}


// WEBPACK FOOTER //
// ./packages/commons/lib/utils/css/TransitionUtils.js