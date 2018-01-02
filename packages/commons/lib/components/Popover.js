'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ui = require('@signavio/ui');

var _styles = require('../styles');

exports.default = (0, _styles.defaultStyle)(function () {
  return {
    node: {
      zIndex: 3000 // place over Overlay, which has zIndex 2000
    }
  };
})(_ui.Popover);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/Popover.js