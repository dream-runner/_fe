import Backbone from 'backbone-rel-partialput'
import UniqueModel from 'uniquemodel'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import User from 'users/models/User'

/**
     * A service account
     *
     */
module.exports = UniqueModel(
  BaseModel.extend({
    references: {
      user: User,
    },

    partialAttributesCore: ['id', 'type'],

    initialize: function() {
      BaseModel.prototype.initialize.apply(this, arguments)
      this._fetchedOptions = {}
      this._fetchedReferences = {
        root: {},
      }
    },

    getOptions: function(optionsKey) {
      return this._fetchedOptions[optionsKey]
    },

    fetchOptions: function(optionsKey, successCb, errorCb) {
      Backbone.ajax({
        type: 'GET',
        url: this.url() + '/options/' + optionsKey,
        contentType: 'application/json',
        success: function(resp) {
          this._fetchedOptions[optionsKey] = resp

          if (successCb) {
            successCb(resp)
          }
        }.bind(this),
        error: function(resp) {
          if (errorCb) {
            errorCb(resp)
          }
        }.bind(this),
      })
    },

    ensureOrganizationHasRestrictedAccess: function(organization, user) {
      var isCurrentOrgEntity = entity => {
        return entity.type === 'organization' && entity.id === organization.id
      }

      var access = { ...this.get('access') } // This is just a plain JSON object
      if (!access.restricted) access.restricted = []
      if (!_.some(access.restricted, isCurrentOrgEntity)) {
        access.restricted.push({
          id: organization.id,
          type: 'organization',
        })

        access.view = [{ id: user.id, type: 'user' }] // also ensure the user has access
        this.set('access', access)
        this.save()
      }
    },

    hasViewAccess: function(user) {
      var acl = this.get('access') && this.get('access').view
      if (!acl) {
        return false
      }
      return _.some(acl, entry => entry.type === 'user' && entry.id === user.id)
    },
  }),
  'Account'
)



// WEBPACK FOOTER //
// ./src/services/models/Account.js