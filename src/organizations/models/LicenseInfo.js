import i18n from 'i18n'
import moment from '@signavio/effektif-commons/lib/extensions/moment'
import Effektif from 'singleton/Effektif'
import { models as commonsModels } from 'commons'
const { BaseModel } = commonsModels
import { LicenseUtils } from '../utils'

module.exports = BaseModel.extend({
  urlRoot: Effektif.makeUrl('info/licenses'),

  /**
         * Creates a composite id which is used to submit a license selection to the backend.
         * The composite id consists of the type, packages, the expiration date and information
         * whether a generator is used or not.
         */
  compositeId: function() {
    var id = ''
    if (this.isGenerator()) {
      id += '+'
    }
    id += this.type()
    if (this.hasPackages()) {
      id += ';' + this.packages().join('+')
    }
    if (this.hasExpirationDate()) {
      // it is important to use the date in UTC, otherwise the right license cannot be found in some timezones
      id += ';' + moment(this.expirationDate()).utc().format('DD-MM-YYYY')
    }
    return id
  },

  title: function() {
    return LicenseUtils.getTitle(this.type()) || this.type()
  },

  type: function() {
    return this.get('type')
  },

  hasPackages: function() {
    return this.has('packages') && this.get('packages').length > 0
  },

  packages: function() {
    return this.get('packages')
  },

  isExpired: function() {
    return (
      this.hasExpirationDate() &&
      moment(this.get('expirationDate')).isBefore(moment())
    )
  },

  hasExpirationDate: function() {
    return this.has('expirationDate')
  },

  expirationDate: function() {
    return this.get('expirationDate')
  },

  expirationDateFormatted: function() {
    return this.hasExpirationDate()
      ? moment(this.expirationDate()).format('LL')
      : ''
  },

  expiresSoon: function() {
    if (this.hasExpirationDate()) {
      return moment().add(2, 'months').isAfter(this.expirationDate())
    }
    return false
  },

  number: function() {
    return this.get('number')
  },

  isUsed: function() {
    return !this.get('unused')
  },

  isUnused: function() {
    return !!this.get('unused')
  },

  isForInvite: function() {
    return !!this.get('invitationAllowed')
  },

  isGenerator: function() {
    return !!this.get('isGenerator')
  },
})



// WEBPACK FOOTER //
// ./src/organizations/models/LicenseInfo.js