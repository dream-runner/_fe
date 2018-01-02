import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import UserCollection from 'users/collections/UserCollection'

module.exports = UniqueModel(
  BaseModel.extend({
    references: {
      users: UserCollection,
    },

    defaults: {
      users: [],
    },

    add: function(user) {
      if (!this.get('users')) {
        this.set('users', [])
      }

      this.get('users').add(user)

      this.save()
    },

    remove: function(user) {
      if (!this.get('users')) {
        return
      }

      this.get('users').remove(user)

      this.save()
    },

    member: function(user) {
      if (!user || !this.get('users')) {
        return false
      }

      return this.get('userIds').indexOf(user.id) >= 0
    },

    members: function() {
      return this.get('users').toArray()
    },

    // needed for interface with organization
    users: function() {
      return this.members()
    },
  }),
  'Group'
)



// WEBPACK FOOTER //
// ./src/users/models/Group.js