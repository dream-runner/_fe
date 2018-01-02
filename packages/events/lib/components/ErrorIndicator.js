'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recompose = require('recompose');

var _styles = require('@signavio/effektif-commons/lib/styles');

var _components = require('@signavio/effektif-commons/lib/components');

exports.default = (0, _recompose.compose)((0, _styles.defaultStyle)(function (_ref) {
  var color = _ref.color;
  return {
    backgroundColor: color.status.danger,
    color: _styles.utils.color(color.status.danger)
  };
}), (0, _recompose.withProps)(function () {
  return { icon: 'times', small: true };
}))(_components.Icon);


// WEBPACK FOOTER //
// ./packages/events/lib/components/ErrorIndicator.js