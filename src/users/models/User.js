import UniqueModel from 'uniquemodel'
import { compact, isUndefined, some } from 'lodash'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import Preferences from 'users/models/Preferences'
import LicenseCollection from 'organizations/collections/LicenseCollection'

import { userUtils } from '@signavio/effektif-api'

/**
     * A user of the Effektif application
     *
     */
module.exports = UniqueModel(
  BaseModel.extend({
    urlRoot: function() {
      return Effektif.makeUrl('users')
    },

    references: {
      organizations: function() {
        return require('organizations/collections/OrganizationCollection')
      },
    },

    embeddings: {
      preferences: Preferences,
      licenses: LicenseCollection,
    },

    url: function() {
      var suffix = this.isNew() ? '' : '/' + this.id
      return this.urlRoot() + suffix
    },

    attributes: {
      id: '',
      firstName: '',
      lastName: '',
    },

    defaults: {
      firstName: '',
      lastName: '',
      password: '',
      phone: '',
      country: '',
      preferences: {},
      feedback: [],
      organizations: [],
    },

    inlineJSON: ['preferences'],

    name: function() {
      return compact([this.get('firstName'), this.get('lastName')]).join(' ')
    },

    isAdmin: function() {
      return !!this.get('admin')
    },

    getGroups: function() {
      return Effektif.list('groups').filter(group => {
        return group.member(this)
      }, this)
    },

    isSystemAdmin: function() {
      return this.get('systemAdmin') === true
    },

    isSystemUser: function() {
      return this.get('systemUser') === true
    },

    initials: function() {
      return userUtils.initials(this.toJSON())
    },

    hasAvatar: function() {
      return this.get('color') === ''
    },

    hasColor: function() {
      return !isUndefined(this.get('color'))
    },

    license: function() {
      if (this.get('licenses')) {
        return this.get('licenses').getLicenseForUser(this)
      }
      return null
    },

    toString: function() {
      return 'User: ' + this.name()
    },

    isDeleted: function() {
      return this.name().length === 0
    },

    isMemberOf: function(group) {
      return some(this.get('groupIds') || [], groupId => groupId === group.id)
    },
  }),
  'User'
)



// WEBPACK FOOTER //
// ./src/users/models/User.js