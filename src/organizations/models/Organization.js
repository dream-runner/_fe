import UniqueModel from 'uniquemodel'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels

import UserCollection from 'users/collections/UserCollection'
import FeedbackCollection from 'container/collections/FeedbackCollection'
import InvitationCollection from '../collections/InvitationCollection'
import LicenseInfoCollection from '../collections/LicenseInfoCollection'

/**
     * An organization is an isolated collaboration environment and dataset within Effektif for a team of users
     *
     */
module.exports = UniqueModel(
  BaseModel.extend({
    url: function() {
      if (this.parent) {
        return this.parent.url() + '/' + this.id
      }

      return Effektif.makeUrl('')
    },

    references: {
      admins: UserCollection,
      members: UserCollection,
      invitations: InvitationCollection,
      licenses: LicenseInfoCollection,
    },

    embeddings: {
      feedback: FeedbackCollection,
    },

    defaults: {
      admins: [],
      members: [],
      invitations: [],
      feedback: [],
      licenses: [],
      name: '',
    },

    member: function(user) {
      return this.get('members').includes(user)
    },

    members: function() {
      var members = this.get('members').models
      var groups = this.groups().models

      return members.concat(groups)
    },

    users: function() {
      return this.get('members').models
    },

    groups: function() {
      return Effektif.list('groups')
    },

    leave: function(user) {
      this.get('members').remove(user)
      this.get('admins').remove(user)
    },

    sendFeedback: function(message, clb, ctx) {
      this.get('feedback').add(message)

      message.once('sync', clb, ctx)
      message.save()
    },
  }),
  'Organization'
)



// WEBPACK FOOTER //
// ./src/organizations/models/Organization.js