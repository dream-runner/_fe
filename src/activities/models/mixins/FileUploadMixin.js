// A mixin for the Activity models for type GoogleDriveFileUpload
exports.initialize = function() {
  this.on(
    'change:account',
    () => {
      this.set('folderId', null)
    },
    this
  )
}



// WEBPACK FOOTER //
// ./src/activities/models/mixins/FileUploadMixin.js