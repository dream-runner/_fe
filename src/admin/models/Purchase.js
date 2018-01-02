import UniqueModel from 'uniquemodel'
import Effektif from 'singleton/Effektif'
import EditableModel from 'forms/models/EditableModel'
import Organization from 'eff-admin/models/Organization'
import User from 'eff-admin/models/User'

module.exports = UniqueModel(
  EditableModel.extend({
    urlRoot: Effektif.rootUrl('/admin/purchase'),

    url: function() {
      if (!this.id) {
        return this.urlRoot
      }

      return this.urlRoot + '/' + this.id
    },

    references: {
      orderedBy: User,
      completedBy: User,
      organization: Organization,
    },

    fields: {
      licenseType: {
        type: { name: 'text' },
      },
      count: {
        type: { name: 'number' },
      },
      completed: {
        type: { name: 'boolean' },
      },
      rejected: {
        type: { name: 'boolean' },
      },
      billingType: {
        type: { name: 'text' },
      },
      created: {
        type: { name: 'date', kind: 'datetime' },
      },
      billTo: {
        type: { name: 'text' },
      },
      company: {
        type: { name: 'text' },
      },
      phone: {
        type: { name: 'text' },
      },
      emailAddress: {
        type: { name: 'emailAddress' },
      },
      address: {
        type: { name: 'text', multiLine: true },
        placeholder: 'Streetname / Nr\nZIP code / City\nCountry',
      },
    },
  }),
  'AdminPurchase'
)



// WEBPACK FOOTER //
// ./src/admin/models/Purchase.js