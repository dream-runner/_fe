import UniqueModel from 'uniquemodel'
import Effektif from 'singleton/Effektif'
import EditableModel from 'forms/models/EditableModel'
import User from 'eff-admin/models/User'
import Organization from 'eff-admin/models/Organization'

module.exports = UniqueModel(
  EditableModel.extend({
    urlRoot: Effektif.rootUrl('admin/registrations'),

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
  }),
  'AdminRegistration'
)



// WEBPACK FOOTER //
// ./src/admin/models/Registration.js