import _ from 'underscore'
import Effektif from 'singleton/Effektif'
import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import Invitation from 'eff-admin/models/Invitation'

module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.rootUrl('admin/invitations')
  },

  url: function() {
    if (this.parent) {
      return this.parent.url() + '/invitations'
    }

    return this.urlRoot()
  },

  model: Invitation,
})



// WEBPACK FOOTER //
// ./src/admin/collections/InvitationCollection.js