import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import User from 'users/models/User'

module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.makeUrl('users')
  },

  model: User,

  registered: function() {
    return this.filter(user => {
      if (!user || !user.name()) {
        // this user has probably been deleted
        return false
      }

      if (user.isSystemUser()) {
        return false
      }

      return true
    })
  },
})



// WEBPACK FOOTER //
// ./src/users/collections/UserCollection.js