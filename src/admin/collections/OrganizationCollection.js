import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Organization from 'eff-admin/models/Organization'

module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.rootUrl('admin/organizations')
  },

  model: Organization,
})



// WEBPACK FOOTER //
// ./src/admin/collections/OrganizationCollection.js