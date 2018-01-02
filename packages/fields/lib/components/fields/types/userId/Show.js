'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _workflowOrganizations = require('@signavio/workflow-organizations');

var _components = require('@signavio/effektif-commons/lib/components');

var withoutType = (0, _components.omitProps)(['type']);

exports.default = withoutType(_workflowOrganizations.User);


// WEBPACK FOOTER //
// ./packages/fields/lib/components/fields/types/userId/Show.js