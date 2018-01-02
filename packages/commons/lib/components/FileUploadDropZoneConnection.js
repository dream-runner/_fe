'use strict';

var _lodash = require('lodash');

var Connection = function Connection() {};

(0, _lodash.assignIn)(Connection.prototype, {
  dropZone: null,
  dropZoneChangeCallback: null,

  setDropZone: function setDropZone(dropZone) {
    this.dropZone = dropZone;
    if ((0, _lodash.isFunction)(this.dropZoneChangeCallback)) {
      this.dropZoneChangeCallback(this.dropZone);
    }
  },

  onDropZoneChange: function onDropZoneChange(dropZoneChangeCallback) {
    this.dropZoneChangeCallback = dropZoneChangeCallback;
  }
});

module.exports = Connection;


// WEBPACK FOOTER //
// ./packages/commons/lib/components/FileUploadDropZoneConnection.js