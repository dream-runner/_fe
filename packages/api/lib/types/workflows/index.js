'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OUTPUT_DESCRIPTORS = exports.INPUT_DESCRIPTORS = exports.WORKFLOWS = exports.WORKFLOW = undefined;

var _workflow = require('./workflow');

var _WORKFLOW = _interopRequireWildcard(_workflow);

var _workflows = require('./workflows');

var _WORKFLOWS = _interopRequireWildcard(_workflows);

var _inputDescriptors = require('./inputDescriptors');

var _INPUT_DESCRIPTORS = _interopRequireWildcard(_inputDescriptors);

var _outputDescriptors = require('./outputDescriptors');

var _OUTPUT_DESCRIPTORS = _interopRequireWildcard(_outputDescriptors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.WORKFLOW = _WORKFLOW;
exports.WORKFLOWS = _WORKFLOWS;
exports.INPUT_DESCRIPTORS = _INPUT_DESCRIPTORS;
exports.OUTPUT_DESCRIPTORS = _OUTPUT_DESCRIPTORS;


// WEBPACK FOOTER //
// ./packages/api/lib/types/workflows/index.js