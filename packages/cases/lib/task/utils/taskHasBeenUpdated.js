'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = taskHasBeenUpdated;

var _lodash = require('lodash');

var getPending = function getPending(props) {
  return (0, _lodash.get)(props, 'updateTask.pending', true);
};

function taskHasBeenUpdated(props, nextProps) {
  return getPending(props) && !getPending(nextProps);
}


// WEBPACK FOOTER //
// ./packages/cases/lib/task/utils/taskHasBeenUpdated.js