'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TABLE_ADD_COLUMN = exports.TABLE_ADD_COLUMN = 'TABLE_ADD_COLUMN';
var TABLE_REMOVE_COLUMN = exports.TABLE_REMOVE_COLUMN = 'TABLE_REMOVE_COLUMN';
var TABLE_REPLACE_COLUMN = exports.TABLE_REPLACE_COLUMN = 'TABLE_REPLACE_COLUMN';
var TABLE_REORDER_COLUMNS = exports.TABLE_REORDER_COLUMNS = 'TABLE_REORDER_COLUMNS';

exports.default = {
  addColumn: function addColumn(column) {
    return {
      type: TABLE_ADD_COLUMN,
      payload: {
        column: column
      }
    };
  },
  removeColumn: function removeColumn(index) {
    return {
      type: TABLE_REMOVE_COLUMN,
      payload: {
        index: index
      }
    };
  },
  replaceColumn: function replaceColumn(index, column) {
    return {
      type: TABLE_REPLACE_COLUMN,
      payload: {
        index: index,
        column: column
      }
    };
  },
  reorderColumns: function reorderColumns(indices) {
    return {
      type: TABLE_REORDER_COLUMNS,
      payload: {
        indices: indices
      }
    };
  }
};


// WEBPACK FOOTER //
// ./packages/reporting/lib/report/actions/table.js