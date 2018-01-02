import UniqueModel from 'uniquemodel'
import Effektif from 'singleton/Effektif'
import EditableModel from 'forms/models/EditableModel'
import User from 'eff-admin/models/User'
import Organization from 'eff-admin/models/Organization'

module.exports = UniqueModel(
  EditableModel.extend({
    urlRoot: Effektif.rootUrl('/admin/feedback'),

    url: function() {
      if (this.id) {
        return this.urlRoot + '/' + this.id
      }

      return this.urlRoot
    },

    references: {
      user: User,
      organization: Organization,
    },

    fields: {
      subject: {
        type: { name: 'text' },
      },
      message: {
        type: { name: 'text', multiLine: true },
      },
      url: {
        type: { name: 'link' },
      },
      created: {
        type: { name: 'date', kind: 'datetime' },
      },
      effektifVersion: {
        type: { name: 'text' },
      },
      browser: {
        type: { name: 'text', multiLine: true },
      },
    },
  }),
  'AdminFeedback'
)



// WEBPACK FOOTER //
// ./src/admin/models/Feedback.js