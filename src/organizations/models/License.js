import moment from '@signavio/effektif-commons/lib/extensions/moment'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import { LicenseUtils } from '../utils'

module.exports = BaseModel.extend({
  urlRoot: Effektif.makeUrl('licenses'),

  title: function() {
    return LicenseUtils.getTitle(this.get('type')) || this.get('type')
  },

  isUsed: function() {
    return this.has('userId') || this.has('invitee')
  },

  isUnused: function() {
    return !this.has('userId') && !this.has('invitee')
  },

  userId: function() {
    return this.get('userId')
  },

  user: function() {
    if (this.has('userId')) {
      return Effektif.list('users').get(this.get('userId'))
    } else {
      return null
    }
  },

  invitee: function() {
    return this.get('invitee')
  },

  type: function() {
    return this.get('type')
  },

  hasExpirationDate: function() {
    return this.has('expirationDate')
  },

  expirationDate: function() {
    return this.get('expirationDate')
  },

  expirationDateFormatted: function() {
    if (!this.has('expirationDate')) {
      return ''
    }

    return moment(this.expirationDate()).format('LL')
  },

  expiresSoon: function() {
    if (this.hasExpirationDate()) {
      return moment().add(2, 'months').isAfter(this.expirationDate())
    }
    return false
  },
})



// WEBPACK FOOTER //
// ./src/organizations/models/License.js