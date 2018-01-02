import _ from 'underscore'
import moment from '@signavio/effektif-commons/lib/extensions/moment'

import Effektif from 'singleton/Effektif'

import { collections as commonsCollections } from 'commons'
const { BaseCollection } = commonsCollections
import License from '../models/License'
import { LicenseUtils } from '../utils'

module.exports = BaseCollection.extend({
  urlRoot: function() {
    return Effektif.makeUrl('licenses')
  },

  model: License,

  getUsed: function() {
    return this.filter(license => {
      return license.isUsed()
    })
  },

  getUnused: function() {
    return this.filter(license => {
      return license.isUnused()
    })
  },

  /**
         * The collection can contain multiple licenses per user.
         * This method will return the one that is the highest in the hierarchy
         * and has the longest expiration period.
         */
  getLicenseForUser: function(user) {
    if (!user) {
      return null
    }
    var userLicenses = this.filter(license => {
      return license.userId() === user.id
    })

    if (userLicenses.length === 0) {
      return null
    }

    if (userLicenses.length === 1) {
      return userLicenses[0]
    }

    userLicenses = _.sortBy(userLicenses, l => {
      var prio = LicenseUtils.getPriority(l.type())
      return -1 * (LicenseUtils.defaultPriority() - prio)
    })
    var max = LicenseUtils.getPriority(userLicenses[0].type())
    userLicenses = _.filter(userLicenses, l => {
      return max === LicenseUtils.getPriority(l.type())
    })
    userLicenses = _.sortBy(userLicenses, l => {
      var exp
      if (l.expirationDate()) {
        exp = moment(l.expirationDate()).valueOf()
      } else {
        exp = Number.MAX_VALUE || 0
      }
      return -1 * exp
    })

    return userLicenses[0]
  },

  /**
         * Returns the license for the given invitation.
         */
  getLicenseForInvitation: function(invitation) {
    if (invitation) {
      var mail = invitation.emailAddress()
      var userLicenses = this.filter(l => {
        return mail === l.invitee()
      })
      // there should be actually just one
      if (userLicenses.length > 0) {
        return userLicenses[0]
      }
    }
    return null
  },
})



// WEBPACK FOOTER //
// ./src/organizations/collections/LicenseCollection.js