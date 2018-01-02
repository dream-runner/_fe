import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import User from 'eff-admin/models/User'

module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.rootUrl('admin/users')
  },

  model: User,
})



// WEBPACK FOOTER //
// ./src/admin/collections/UserCollection.js