'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styles = require('@signavio/effektif-commons/lib/styles');

exports.default = (0, _styles.defaultStyle)({
  height: 90,

  fontSize: _styles.font.size.form,

  '&condensed': {
    height: null
  }
}, function (_ref) {
  var condensed = _ref.condensed;
  return {
    '&condensed': condensed
  };
});


// WEBPACK FOOTER //
// ./packages/organizations/lib/licenses/components/higher-order/groupStyle.js