'use strict';

var _lodash = require('lodash');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Connection = function Connection() {
  this.sortable = null;
};

(0, _lodash.assignIn)(Connection.prototype, {
  sortable: null,
  draggables: null,

  setSortable: function setSortable(sortable) {
    this.sortable = sortable;
    if (this.draggables) {
      for (var i = 0; i < this.draggables.length; i++) {
        (0, _jquery2.default)(this.draggables[i]).draggable('option', 'connectToSortable', this.sortable);
      }
    }
  },

  unsetSortable: function unsetSortable() {
    delete this.sortable;
    if (this.draggables) {
      for (var i = 0; i < this.draggables.length; i++) {
        (0, _jquery2.default)(this.draggables[i]).draggable('option', 'connectToSortable', null);
      }
    }
  },

  connectToSortable: function connectToSortable(draggable) {
    if (!this.draggables) this.draggables = [];
    this.draggables.push(draggable);
    if (this.sortable) {
      (0, _jquery2.default)(draggable).draggable('option', 'connectToSortable', this.sortable);
    }
  },

  unconnect: function unconnect(draggable) {
    (0, _jquery2.default)(draggable).draggable('option', 'connectToSortable', null);
    this.draggables = (0, _lodash.without)(this.draggables, draggable);
  }
});

module.exports = Connection;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/DraggableSortableConnection.js