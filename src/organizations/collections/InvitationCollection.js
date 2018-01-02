import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Invitation from '../models/Invitation'

module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.makeUrl('invitations')
  },

  model: Invitation,
})



// WEBPACK FOOTER //
// ./src/organizations/collections/InvitationCollection.js