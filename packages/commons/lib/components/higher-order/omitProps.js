'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fp = require('lodash/fp');

var _recompose = require('recompose');

exports.default = (0, _recompose.compose)(_recompose.mapProps, _fp.omit);


// WEBPACK FOOTER //
// ./packages/commons/lib/components/higher-order/omitProps.js