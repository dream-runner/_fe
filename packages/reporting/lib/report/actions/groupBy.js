'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GROUP_BY_ADD = exports.GROUP_BY_ADD = 'GROUP_BY_ADD';
var GROUP_BY_REMOVE = exports.GROUP_BY_REMOVE = 'GROUP_BY_REMOVE';
var GROUP_BY_REORDER = exports.GROUP_BY_REORDER = 'GROUP_BY_REORDER';

exports.default = {
  addGroupBy: function addGroupBy(binding) {
    return {
      type: GROUP_BY_ADD,
      payload: {
        binding: binding
      }
    };
  },
  removeGroupBy: function removeGroupBy(index) {
    return {
      type: GROUP_BY_REMOVE,
      payload: {
        index: index
      }
    };
  },
  reorderGroupBy: function reorderGroupBy(indices) {
    return {
      type: GROUP_BY_REORDER,
      payload: {
        indices: indices
      }
    };
  }
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/actions/groupBy.js