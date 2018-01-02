import UniqueModel from 'uniquemodel'

import Effektif from 'singleton/Effektif'

import EditableModel from 'forms/models/EditableModel'

export default UniqueModel(
  EditableModel.extend({
    urlRoot: Effektif.rootUrl('/admin/releasenotes'),

    fields: {
      version: {
        type: { name: 'text' },
      },
      title: {
        type: { name: 'text' },
      },
      notes: {
        type: { name: 'text', multiLine: true },
      },
      releaseDate: {
        type: { name: 'date', kind: 'date' },
      },
    },

    url: function() {
      if (this.id) {
        return this.urlRoot + '/' + this.id
      }

      return this.urlRoot
    },
  }),
  'AdminRelease'
)



// WEBPACK FOOTER //
// ./src/admin/models/Release.js