import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Group from 'users/models/Group'
module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.makeUrl('groups')
  },

  model: Group,
})



// WEBPACK FOOTER //
// ./src/users/collections/GroupCollection.js